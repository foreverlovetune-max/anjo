import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateImage(prompt: string, filename: string) {
  console.log(`Generating ${filename}...`);
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: prompt,
    });
    
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const buffer = Buffer.from(part.inlineData.data, 'base64');
        const publicDir = path.join(process.cwd(), 'public');
        if (!fs.existsSync(publicDir)) {
          fs.mkdirSync(publicDir, { recursive: true });
        }
        const filepath = path.join(publicDir, filename);
        fs.writeFileSync(filepath, buffer);
        console.log(`Saved ${filename}`);
        return;
      }
    }
    console.log(`No image data found for ${filename}`);
  } catch (e) {
    console.error(`Error generating ${filename}:`, e);
  }
}

async function main() {
  await generateImage("A majestic, hyper-realistic digital painting of Archangel Michael in ornate golden and blue armor with large white wings, holding a shield with an eagle emblem and a sword, standing in front of a heavenly city with golden sunlight. Cinematic lighting, highly detailed.", "archangel.jpg");
  await generateImage("A happy multi-generational family (grandparents, parents, child) sitting together on a couch, smiling, warm lighting, cozy atmosphere, realistic photography.", "family.jpg");
  await generateImage("An older couple holding a pink piggy bank and Brazilian real money notes, smiling, warm lighting, realistic photography.", "finance.jpg");
  await generateImage("Silhouette of hands raised towards a beautiful bright sunset over the ocean, catching the sunlight, spiritual and peaceful atmosphere, realistic photography.", "blessings.jpg");
  await generateImage("A dramatic classical painting style scene of Jesus in white robes reaching out to someone in a dark cave, bringing a beam of divine light to the darkness.", "breaking_evil.jpg");
  await generateImage("A realistic vertical selfie video frame of a young woman holding a baby in her living room, looking directly at the camera, natural lighting.", "testimonial1.jpg");
  await generateImage("A realistic vertical selfie video frame of an older woman with short grey hair and glasses in her house, looking directly at the camera, natural lighting.", "testimonial2.jpg");
}

main();
