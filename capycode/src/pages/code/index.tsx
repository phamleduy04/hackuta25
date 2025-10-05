
import CodeEditor from "./code-editor";
import SpeakingCapy from "@/components/SpeakingCapy";

export default function Code() {
    return (
        <div className="h-screen w-full relative">
            <CodeEditor />
            <SpeakingCapy />
        </div>
    );
}