"use client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import "./pages.css";
import { marked } from "marked";
const genAI = new GoogleGenerativeAI("AIzaSyAmaL0M7GZzbBrteRhQr3DQizJH0N22ssQ");

export default function NewPage() {
  const [prompt, setPrompt] = useState(``);
  const [text, setText] = useState(`<p style="color:#565656;">Write your Code in the AI Code Explainer Box</p>`);
  console.log(text);
  const handlePrompt = (event) => {
    setPrompt(event.target.value);
    console.log(prompt);
  };

  async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const finalPrompt = `Explain this code in Simple Paragraphs, don't use any bullets or titles or anything fancy, keep it response length short: ${prompt}`;
    const result = await model.generateContent(finalPrompt);

    const response = result.response;
    setText(response.text());
  }

  const html = marked.parse(text);
  let regex = new RegExp(`<p>`, "g");
  const convertedHtml = html.replace(
    regex,
    `<p style="margin-top:10px;"><span style="display: inline-block; margin-left: 40px;"></span>`
  );
  console.log(convertedHtml);

  return (
    <>
      <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div class="grid md:grid-cols-6 gap-10">
          <div class="md:col-span-3">
            <div className="xl:max-w-2xl m-auto md:pr-10 pr-0 text-center">
              <h1 className="font-bold text-3xl anta-regular">
                AI CODE EXPLAINER
              </h1>
              <p className="mt-5 mb-5">
                This is a tool that uses AI under the hood to explain any piece
                of code you don't understand. Paste the code in the code editor
                below and press "Explain Code" and AI will output a paragraph
                explaining what the code is doing.
              </p>
              <textarea
                spellCheck="false"
                className="textarea"
                rows={20}
                onChange={handlePrompt}
              />
              {/* <button onClick={run}>Generate</button> */}
              <div className="text-center">
                <button
                  onClick={run}
                  className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group"
                >
                  <span class="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>
                  <span class="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
                  <span class="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
                  <span class="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
                  <span class="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
                  <span class="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
                  <span class="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
                  <span class="relative">Explain Code</span>
                </button>
              </div>
            </div>
          </div>
          <div class="md:col-span-3">
            <div className="text-2xl font-bold">Response {'=>'} </div>
            <div
              class="text-justify jetbrains-mono"
              dangerouslySetInnerHTML={{ __html: convertedHtml }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
