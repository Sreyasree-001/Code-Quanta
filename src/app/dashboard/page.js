"use client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import "./pages.css";

const genAI = new GoogleGenerativeAI("AIzaSyAmaL0M7GZzbBrteRhQr3DQizJH0N22ssQ");

export default function NewPage() {
  const [prompt, setPrompt] = useState(``);
  const [text, setText] = useState(``);

  const handlePrompt = (event) => {
    setPrompt(event.target.value);
    console.log(prompt);
  };

  async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    setText(response.text());
  }

  return (
    <>
      <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div class="grid md:grid-cols-6 gap-10">
          <div class="md:col-span-3">
            <div className="xl:max-w-2xl m-auto pr-10">
              <h1 className="font-bold text-3xl anta-regular">
                AI CODE EXPLAINER
              </h1>
              <p className="mt-5 mb-5">
                This is a tool that uses AI under the hood to explain any piece
                of code you don't understand. Paste the code in the code editor
                below and press "Explain Code" and AI will output a paragraph
                explaining what the code is doing.
              </p>
              <textarea className="textarea" rows={8} onChange={handlePrompt}/>
              <button onClick={run}>Generate</button>
            </div>
            
          </div>
          <div class="md:col-span-3">{text}</div>
        </div>
      </div>
    </>
  );
}
