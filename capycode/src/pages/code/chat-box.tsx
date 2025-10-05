import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useVoice } from "@/hooks/use-voice";

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
            {messages.map((message, index) => (
                <div key={index}>
                    {message.message}
                </div>
            ))}
        </div>
    )
}