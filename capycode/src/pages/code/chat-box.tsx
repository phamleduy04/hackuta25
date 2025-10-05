import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

    const [tab, setTab] = useState<string>("plan");

    return (
        <div className="relative h-full">
            <div className="absolute bottom-0 p-2 z-10 w-full flex justify-center items-center">
                <ChatToolbar />
            </div>
            <div className="flex flex-col h-full relative">
                <div className="flex flex-col gap-2 p-2 h-full w-full">
                    <Tabs value={tab} onValueChange={setTab} className="w-full h-full flex justify-center ">
                        <div className="absolute top-0 left-0 w-full p-4 z-10">
                            <TabsList className="flex justify-center w-full">
                                <TabsTrigger onClick={() => setTab("plan")} value="plan" className="w-max">Plan</TabsTrigger>
                                <TabsTrigger onClick={() => setTab("messages")} value="messages" className="w-max">Messages</TabsTrigger>
                            </TabsList>
                        </div>
                        <div className="overflow-y-auto pt-14 h-full">
                            <TabsContent value="plan" className="w-full h-max mb-12 pl-2 gap-2 flex flex-col overflow-y-auto">
                                <Markdown remarkPlugins={[remarkGfm]}>{plan}</Markdown>
                            </TabsContent>
                            <TabsContent value="messages" className="w-full h-max mb-12 gap-2 flex flex-col overflow-y-auto">
                                <div className="text-white p-2 flex flex-col gap-2 mb-12">
                                    {messages.length === 0 && (
                                        <div className="text-white px-2 flex flex-col gap-2 mb-10">
                                            <p>No messages yet</p>
                                        </div>
                                    )}
                                    {messages.map((message, index) => (
                                        <div key={index} className="flex flex-col gap-2 w-full">
                                            <div className={cn("text-white bg-gray-900 p-2 rounded-md", message.source === "user" ? "bg-white text-black ml-auto" : "bg-gray-900 mr-auto")}>
                                                <Markdown remarkPlugins={[remarkGfm]}>{message.message}</Markdown>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>
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
        <div className="flex gap-2">
            <Button onClick={endSession}>Stop Session</Button>
            {(conversationStatus === "paused") ? <Button onClick={resumeSession}>Resume Session</Button> : <Button onClick={pauseSession}>Pause Session</Button>}
        </div>
    )
}