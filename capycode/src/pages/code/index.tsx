
import CodeEditor from "./code-editor";
import { VoiceProvider } from "@/contexts/voice-context";

export default function Code() {
    return (
        <VoiceProvider>
            <div className="h-screen w-full">
                <CodeEditor />
            </div>
        </VoiceProvider>
    );
}