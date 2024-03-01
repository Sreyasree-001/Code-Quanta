'use client'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import "./page1.css"
export default function Home() {
    const router = useRouter()
    return (
        <>
            <div class="area">
                <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            <div className="bg-slate-900 h-screen bg-transparent ">
                <div className="bg-gradient-to-b from-violet-600/[.15] via-transparent flex flex-col items-center">
                    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
                        {/* Announcement Banner */}
                        <div className="flex justify-center ">
                            <a
                                className="group inline-block bg-white/[.05] hover:bg-white/[.1] border
                                shadow-white border-white/[.05] p-1 ps-4 rounded-full shadow-sm"
                                href="https://gemini.google.com/"
                            >
                                <p className="me-2 inline-block text-white text-sm">
                                    Powered by Gemini
                                </p>
                            </a>
                        </div>
                        {/* End Announcement Banner */}
                        {/* Title */}
                        <div className="max-w-3xl text-center mx-auto">
                            <h1 className="block font-medium raleway text-[#05096c] text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                                Let AI help you understand programming better
                            </h1>
                        </div>
                        {/* End Title */}
                        <div className="max-w-3xl text-center mx-auto">
                            <p className="text-lg jetbrains-mono text-gray-900">
                                Write your code and get detailed explanation
                            </p>
                        </div>
                        {/* Buttons */}
                        <div className="text-center">
                            <button
                                class="button"
                                data-text="Awesome"
                                onClick={() => router.push('/dashboard')}
                            >
                                <span class="actual-text jetbrains-mono">&nbsp;Generate&nbsp;</span>
                                <span aria-hidden="true" class="hover-text jetbrains-mono">&nbsp;Generate&nbsp;</span>
                            </button>
                        </div>
                        {/* End Buttons */}
                    </div>
                </div>
            </div>


        </>
    );
}
