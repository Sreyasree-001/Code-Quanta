import Image from "next/image";
import Link from "next/link";
import Hello from "./hello";
import "./pages.css"
export default function NewPage() {
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
              <textarea className="textarea" rows={8} />
            </div>
            <div>Made By</div>
          </div>
          <div class="md:col-span-3">2nd Section</div>
        </div>
      </div>
    </>
  );
}
