import fs from 'fs';

// Read the countyDetails.ts to get county details, then generate tier1Data for all of them.
// We can just statically write out the missing ones into a new ts file.
import { countyDetailsMap } from '../src/pages/countyDetails';
import { tier1Data } from '../src/pages/tier1Content';

const newTier1Data = { ...tier1Data };

for (const [key, county] of Object.entries(countyDetailsMap)) {
  if (!newTier1Data[key]) {
    const overview = `${county.name} is a large, busy area covering towns like ${county.majorCities.join(', ')}. Because so many people live and travel through here, it's a highly active area for local police and the Sheriff's Office. You need a bail bondsman who knows the county inside and out.

When an arrest happens—whether it's in a busy city like ${county.majorCities[0]} or a smaller town—the stress hits you immediately. Trying to figure out the local legal system on your own can feel impossible. That's where Jody Story Bail Bonds comes in. We offer fast, reliable help 24 hours a day and send our agents directly to the jail in ${county.countySeat}.

We act as your guide during this stressful time. We keep everything completely confidential, using secure digital paperwork when possible to protect your privacy. We also know that an unexpected arrest can be hard on your wallet. That's why we offer extremely flexible payment plans for the standard 10% fee. Our goal is to get your loved one home without emptying your bank account.`;

    const jailInfo = `The main jail for this area is the ${county.jailName}, located at ${county.jailAddress}. It’s a secure facility that handles people every year. Because they process arrests from ${county.majorCities.slice(0, 2).join(', ')}, and everywhere in between, getting booked can take a long time.

Jody Story Bail Bonds knows exactly how the ${county.countySeat} jail works. Our local agents know the staff, the shift changes, and how to submit paperwork correctly the first time. This means we can often avoid the long, frustrating delays that many families face when trying to post bail themselves.

Once a judge sets the bond amount, our agent takes the certified paperwork straight to the booking desk in ${county.countySeat}. We keep checking the release queue and working with the officers on duty to speed things up, making sure your loved one spends as little time behind bars as possible.`;

    const courtInfo = `Court cases in ${county.name} go through the ${county.localCourts[0]}. It handles serious criminal charges and major civil cases. There are also smaller city courts in places like ${county.majorCities.slice(0, 3).join(', ')} for traffic tickets and minor crimes.

The judges in this circuit are very strict. They expect you to show up to every single court date, without exception. Jody Story Bail Bonds acts as your partner to make sure you stay out of trouble with the court.

When we post a bond, it’s a serious legal contract. We help you keep track of your confusing court schedules and send you reminders before important dates. If a real emergency causes you to miss a date, our strong reputation with the court clerks can sometimes help us fix the issue before the judge issues a new warrant and takes your bond money.`;

    const localBondProcess = `The bail process in ${county.name} is very strict. No matter where someone is arrested in the county, they will be taken to the ${county.jailName} in ${county.countySeat} to be booked. They cannot be released until a judge formally sets their bail amount, or a standard schedule is applied.

Once that amount is set, you need to act fast. Call Jody Story Bail Bonds at (573) 854-9264 right away. We immediately check the jail's system to see the exact charges and the required bail amount. Then, we easily walk you through the agreement.

By state law, you pay a non-refundable fee of 10% of the total bail amount. We specialize in creating custom, affordable payment plans to make this easier on you. We can even handle the paperwork electronically to save time.

Once everything is signed, our agent takes the certified document straight to the booking window at the jail. After the jail staff approves it, the release process begins. We’ll be there to greet your loved one, explain their upcoming court dates, and make sure they get home safely.`;

    const faqs = [
      {
        question: `Where is the ${county.name} Jail located, and how do I get there?`,
        answer: `The ${county.jailName} is located at ${county.jailAddress}. It serves as the primary holding facility for the entire county.`
      },
      {
        question: `Can you assist with arrests made by local police in ${county.majorCities[0]}?`,
        answer: `Yes, absolutely. Arrests made by local police departments in cities like ${county.majorCities.join(', ')} are ultimately transported to the main ${county.name} Jail in ${county.countySeat} if they require state-level bonding. We manage releases for all these jurisdictions.`
      },
      {
        question: `The bond is very high in ${county.name}; do you offer financing?`,
        answer: `Yes. Given the severe nature of some charges in this Circuit, bonds can be substantial. We provide highly flexible, tailored financing plans on the 10% premium to ensure that families can secure release without facing immediate economic ruin.`
      },
      {
        question: `How long does it take to get released from the ${county.countySeat} facility?`,
        answer: `Once our agents lodge the certified bond, administrative release usually takes 2 to 4 hours depending on their volume. However, our presence and constant communication with the desk officers ensure it happens as fast as possible.`
      },
      {
        question: `What happens if a court date at the ${county.name} courthouse is missed?`,
        answer: `Failing to appear will trigger an immediate bench warrant from the judge and initiate bond forfeiture proceedings. If you miss a date, you must call Jody Story Bail Bonds instantly. We can often negotiate a surrender or reinstatement to prevent you from owing the full massive bail amount.`
      }
    ];

    newTier1Data[key] = { overview, jailInfo, courtInfo, localBondProcess, faqs };
  }
}

// Generate the output file
let outputStr = 'export const tier1Data: Record<string, { overview: string; jailInfo: string; courtInfo: string; localBondProcess: string; faqs: { question: string; answer: string }[] }> = {\n';

for (const [key, data] of Object.entries(newTier1Data)) {
  outputStr += `  '${key}': {\n`;
  outputStr += `    overview: \`${data.overview}\`,\n`;
  outputStr += `    jailInfo: \`${data.jailInfo}\`,\n`;
  outputStr += `    courtInfo: \`${data.courtInfo}\`,\n`;
  outputStr += `    localBondProcess: \`${data.localBondProcess}\`,\n`;
  outputStr += `    faqs: [\n`;
  for (let i = 0; i < data.faqs.length; i++) {
    const faq = data.faqs[i];
    outputStr += `      {\n`;
    outputStr += `        question: ${JSON.stringify(faq.question)},\n`;
    outputStr += `        answer: ${JSON.stringify(faq.answer)}\n`;
    outputStr += `      }${i === data.faqs.length - 1 ? '' : ','}\n`;
  }
  outputStr += `    ]\n  },\n`;
}

outputStr += '};\n';
fs.writeFileSync('src/pages/tier1Content.ts', outputStr);

console.log('Successfully updated tier1Content.ts!');
