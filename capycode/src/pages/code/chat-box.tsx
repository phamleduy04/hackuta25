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
    const [tab, setTab] = useState<string>("plan");

    useEffect(() => {
        const storedPlan = localStorage.getItem("plan");
        if (storedPlan) {
            setPlan(JSON.parse(storedPlan));
        }
    }, []);

    return (
        <div className="relative h-full">
            <div className="absolute bottom-0 p-2 z-10 w-full flex justify-center items-center">
                <ChatToolbar />
            </div>
            <Tabs value={tab} onValueChange={setTab} className="w-full h-full flex justify-center">
                <div className="absolute top-0 left-0 w-full p-4 z-10">
                    <TabsList className="flex justify-center w-full">
                        <TabsTrigger value="plan" className="w-max">Plan</TabsTrigger>
                        <TabsTrigger value="messages" className="w-max">Messages</TabsTrigger>
                    </TabsList>
                </div>
                <div className="overflow-y-auto pt-14 h-full pb-16">
                    <TabsContent value="plan" className="w-full h-max pl-2">
                        <Markdown remarkPlugins={[remarkGfm]}>{plan}</Markdown>
                    </TabsContent>
                    <TabsContent value="messages" className="w-full h-max">
                        <div className="text-white p-2 flex flex-col gap-2">
                            {messages.length === 0 ? (
                                <p className="px-2">No messages yet</p>
                            ) : (
                                messages.map((message, index) => (
                                    <div 
                                        key={index} 
                                        className={cn(
                                            "p-2 rounded-md max-w-[85%]",
                                            message.source === "user" 
                                                ? "bg-white text-black ml-auto" 
                                                : "bg-gray-900 mr-auto"
                                        )}
                                    >
                                        <Markdown remarkPlugins={[remarkGfm]}>{message.message}</Markdown>
                                    </div>
                                ))
                            )}
                        </div>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}

function ChatToolbar() {
    const { isMicOn, requestMic, startSession, conversationStatus, endSession, pauseSession, resumeSession } = useVoice();

    if (!isMicOn) {
        return <Button onClick={requestMic}>Request Mic</Button>;
    }

    if (conversationStatus === "stopped") {
        return <Button onClick={startSession}>Start Session</Button>;
    }

    if (conversationStatus === "starting") {
        return <Spinner />;
    }

    return (
        <div className="flex gap-2">
            <Button onClick={endSession}>Stop Session</Button>
            <Button onClick={conversationStatus === "paused" ? resumeSession : pauseSession}>
                {conversationStatus === "paused" ? "Resume" : "Pause"} Session
            </Button>
        </div>
    );
}