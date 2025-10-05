import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useVoice } from "@/hooks/use-voice";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function ChatBox() {

    const { messages } = useVoice();

    const [plan, setPlan] = useState<string>("");

    useEffect(() => {
        const plan = window.localStorage.getItem("plan");
        if (plan) {
            setPlan(JSON.parse(plan));
        }
    }, []);


    return (
        <div className="relative h-full">
            <div className="absolute bottom-0 p-2 z-10 w-full flex justify-center items-center">
                <ChatToolbar />
            </div>
            <div className="flex flex-col overflow-y-auto h-full relative">
                <div className="flex flex-col gap-2 p-2 h-max">
                    <h1 className="text-white text-2xl font-bold">Plan</h1>
                    <Markdown remarkPlugins={[remarkGfm]}>{plan}</Markdown>
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
            </div>
        </div>
    )
}

function ChatToolbar() {

    const { isMicOn, requestMic, startSession, conversationStatus, endSession, pauseSession, resumeSession } = useVoice();

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
        </div>
    )
}