import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req) {
  try {
    const { message } = await req.json();
    if (!message) return NextResponse.json({ reply: "Please type a message." }, { status: 400 });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: "You are Ava, a polite AI clinic receptionist. Only give clinic timings and book appointments. Never give medical advice.",
        temperature: 0.3,
      }
    });

    return NextResponse.json({ reply: response.text || "Please call the clinic." });
  } catch (err) {
    return NextResponse.json({ reply: "System busy. Please call directly." }, { status: 500 });
  }
}
