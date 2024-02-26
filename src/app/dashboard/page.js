import Image from "next/image";
import Link from "next/link";
import Hello from "./hello";
export default function NewPage() {
    return (
        <>
            <main>
            <div>
                <h1>New Page</h1>
                <Hello/>
            </div>
            </main>
        </>
    );
}
