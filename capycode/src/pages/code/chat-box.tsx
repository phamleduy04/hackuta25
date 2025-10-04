import { Button } from "@/components/ui/button";
import { useVoice } from "@/hooks/use-voice";

export default function ChatBox() {
    const { isMicOn, requestMic, startSession, endSession, conversationStatus } = useVoice();

    if (!isMicOn) {
        return (
            <div>
                <Button onClick={requestMic}>Request Mic</Button>
            </div>
        )
    }

    if (conversationStatus === "started") {
        return (
            <div>
                <Button onClick={endSession}>Stop Session</Button>
            </div>
        )
    }

    return (
        <div>
            <Button onClick={startSession}>Start Session</Button>
        </div>
    )
}