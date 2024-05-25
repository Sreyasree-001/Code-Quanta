"use client";
import { MdFileUpload } from "react-icons/md";
import { useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs"
//import { fs } from 'fs'
import { marked, use } from "marked";
import "../dashboard/pages.css"
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export default function ImagePage() {
    const imageRef = useRef(null);
    const [file, setFile] = useState(null);
    const [image, setImage] = useState("");
    const [imageState, setImageState] = useState(false);
    const [imagePath, setImagePath] = useState("");
    const [imageType, setImageType] = useState("");
    const [text, setText] = useState(`<p style="color:#565656;">Write your Code in the AI Code Explainer Box</p>`);
    //image upload handle
    const handleUpload = () => {
        imageRef.current.click();
    }
    const handleImageChange = (event) => {
        let file = event.target.files[0];
        setFile(file);

        setImageState(true);
        setImage(URL.createObjectURL(file))

        setImagePath(URL.createObjectURL(file).replace("blob:",""));
        setImageType(file.type);
        //localStorage.setItem("path",URL.createObjectURL(file).replace("blob:",""))

    }
    //solution generative part
    function fileToGenerativePart(path, mimeType) {

        return {
            inlineData: {
                data: Buffer.from(fs.readFileSync(path)).toString("base64"),
                mimeType
            },
        };
    }
    async function run() {
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
        const prompt = "Explain the picture in simple paragraphs ";

        const imageParts = [fileToGenerativePart(imagePath, imageType)]
        const result = await model.generateContent([prompt, ...imageParts]);
        const response = await result.response;

        setText(response.text());

        console.log(response.text());
    }
    //text formatting
    const html = marked.parse(text);
    let regex = new RegExp(`<p>`, "g");
    const convertedHtml = html.replace(
        regex,
        `<p style="margin-top:10px;"><span style="display: inline-block; margin-left: 40px;"></span>`
    );

    return (
        <>
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div className="grid md:grid-cols-6 gap-10">
                    <div className="md:col-span-3">
                        <div className="xl:max-w-2xl m-auto pr-10 text-center">
                            <h1 className="font-bold text-3xl anta-regular">
                                AI CODE EXPLAINER
                            </h1>
                            <p className="mt-5 mb-5">
                                This is a tool that uses AI under the hood to explain any piece
                                of code you don't understand. Upload the image of your code
                                below and press "Explain Code" and AI will output a paragraph
                                explaining what the code is doing.
                            </p>
                            <div
                                className="bg-[#1f1f1f] h-96 flex justify-center items-center mb-5"
                                onClick={handleUpload}
                            >
                                {
                                    imageState ?
                                        <img
                                            src={image}
                                            alt="upload image"
                                            className="h:inherit max-h-44 sm:max-h-96 p-2 overflow-scroll" />
                                        :
                                        <div className="flex flex-col text-[#565656] font-bold">
                                            <img
                                                src="https://seekicon.com/free-icon-download/cloud-upload_15.png"
                                                alt="upload image"
                                                className="h-40" />
                                            <p>upload file</p>
                                        </div>
                                }
                            </div>
                            {/* <button onClick={run}>Generate</button> */}
                            <div className=" flex flex-col w-44">
                                <label for="file-input" className="bg-[#1f1f1f] p-3 rounded-md bg-opacity-50"
                                >Select a File
                                </label>
                                <input type="file" ref={imageRef} id="file-input" className="hidden"
                                    onChange={handleImageChange}
                                />
                                {
                                    imageState ?
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
                                        :
                                        <></>
                                }
                            </div>
                        </div>
                    </div>
                    {/**Response part */}
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
    )
}