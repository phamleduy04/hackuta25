import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useVoice } from "@/hooks/use-voice";
import { cn } from "@/lib/utils";

export default function ChatBox() {
    const { isMicOn, requestMic, startSession, endSession, conversationStatus, pauseSession, resumeSession, messages } = useVoice();

    if (!isMicOn) {
        return (
            <div>
                <Button onClick={requestMic}>Request Mic</Button>
            </div>
        )
    }

    if (conversationStatus === "stopped") {
        return (
            <div>
                <Button onClick={startSession}>Start Session</Button>
            </div>
        )
    }

    if (conversationStatus === "starting") {
        return (
            <div>
                <Spinner />
            </div>
        )
    }

    return (
        <div>
            <Button onClick={endSession}>Stop Session</Button>
            {(conversationStatus === "paused") ? <Button onClick={resumeSession}>Resume Session</Button> : <Button onClick={pauseSession}>Pause Session</Button>}

            <div className="text-white p-2 flex flex-col gap-2">
                {messages.map((message, index) => (
                    <div key={index} className="flex flex-col gap-2 w-full">
                        <div className={cn("text-white bg-gray-900 p-2 rounded-md", message.source === "user" ? "bg-blue-500 ml-auto" : "bg-gray-900 mr-auto")}>
                            {message.message}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}