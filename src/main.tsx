import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Remove static index.html head tags during hydration/mount to avoid duplication with React Helmet Async
document.querySelectorAll('[data-static="true"]').forEach(el => el.remove());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
