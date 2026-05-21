import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { Resend } from 'resend';
import compression from "compression";
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const CONTACT_EMAIL = process.env.VITE_CONTACT_EMAIL || "jodystory95@yahoo.com";
const FROM_EMAIL = process.env.VITE_FROM_EMAIL || 'Jody Story Bail Bonds <onboarding@resend.dev>';

const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
}) : null;

const SYSTEM_PROMPT = `
You are the AI Assistant for "Jody Story Bail Bonds LLC". 
Your goal is to provide helpful, calm, and professional information about bail bonds.
You are NOT a lawyer and you should NOT give legal advice.
Company Info:
- Name: Jody Story Bail Bonds LLC
- Service: 24/7 Bail Bond assistance
- Areas Served: Over 20 counties across Missouri, including Washington, Jefferson, St. Francois, St. Charles, Howell, and Iron County.
- Core Values: Fast, Confidential, Professional
- Address: 102 North Mine St, Potosi, MO 63664
- Phone: 573-854-9264
- Tone: Empathetic but professional and direct.
Key Info to share:
1. We are open 24/7.
2. The standard fee is 10% of the bail amount.
3. We help with all types of bonds.
4. If someone is in jail, the first step is to call us at 573-854-9264.
If asked for legal advice, politely decline and suggest consulting a licensed attorney.
`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Compress all text assets (JS, CSS, HTML, API responses)
  app.use(compression());

  // Enable global CORS headers so Googlebot, Bingbot, and AI scrapers can fetch fonts/assets cross-origin during rendering
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    
    // Handle OPTIONS preflight
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  app.use(express.json());

  // Contact form API endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, phone, email, county, message, inmateName } = req.body;

      if (!resend) {
        console.log("No RESEND_API_KEY found. Logging message instead:");
        console.log({ name, phone, email, county, message, inmateName });
        return res.json({ success: true, demo: true, message: "Demo mode: Lead logged to server console." });
      }

      const { data, error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: [CONTACT_EMAIL],
        replyTo: email,
        subject: `New Bail Bond Lead: ${name} (${county})`,
        html: `
          <div style="font-family: serif; padding: 20px; color: #000; border: 1px solid #ccc;">
            <h2 style="color: #00D2FF; font-style: italic;">New Bond Inquiry</h2>
            <hr />
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>County of Arrest:</strong> ${county}</p>
            <p><strong>Inmate Name:</strong> ${inmateName || 'N/A'}</p>
            <p><strong>Message:</strong></p>
            <blockquote style="background: #f9f9f9; padding: 10px; border-left: 5px solid #00D2FF;">
              ${message}
            </blockquote>
          </div>
        `,
      });

      if (error) {
        console.error("Resend error:", error);
        return res.status(400).json({ error });
      }

      res.status(200).json({ success: true, data });
    } catch (err) {
      console.error("Server API error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Chat API endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!ai) {
        return res.status(200).json({ text: "Demo mode: AI features will be available once a GEMINI_API_KEY is configured. Please call us at 573-854-9264 for immediate assistance." });
      }

      // Convert history to contents format: [{ role, parts: [{ text }] }]
      // History from client already in this format, but let's be sure
      const contents = [...history, { role: 'user', parts: [{ text: message }] }];

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: contents,
        config: {
          systemInstruction: SYSTEM_PROMPT,
        },
      });

      res.json({ text: response.text });
    } catch (err) {
      console.error("Chat API error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
