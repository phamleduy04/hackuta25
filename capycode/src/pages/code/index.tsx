
import CodeEditor from "./code-editor";
import { VoiceProvider } from "@/contexts/voice-context";

export default function Code() {

    const files = {
        '/Wrapper.js': `export default () => "";`,
    }

    return (
        <VoiceProvider>
            <div className="h-screen w-full min-h-screen">
                <CodeEditor files={files} />
            </div>
        </VoiceProvider>
    )
}