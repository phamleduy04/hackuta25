
import CodeEditor from "./code-editor";
import { VoiceProvider } from "@/contexts/voice-context";
import SpeakingCapy from "@/components/SpeakingCapy";

export default function Code() {
    return (
        <VoiceProvider>
            <div className="h-screen w-full relative">
                <CodeEditor />
                <SpeakingCapy />
            </div>
        </VoiceProvider>
    );
}