// create a context that can be used to access the microphone

import { Role, useConversation } from "@elevenlabs/react";
import { api } from '../../convex/_generated/api';
import { useAction } from "convex/react";
import { createContext, useCallback, useEffect, useRef, useState } from "react";

export type Message = {
    message: string;
    source: Role;
}

export type Status = "started" | "stopped" | "paused" | "starting";

export enum FrameworkEnum {
    static = "static",
    angular = "angular",
    react = "react",
    solid = "solid",
    svelte = "svelte",
    vanilla = "vanilla",
    vue = "vue",
}

export const VoiceContext = createContext<{
    isMicOn: boolean;
    requestMic: () => void;
    startSession: () => void;
    endSession: () => void;
    pauseSession: () => void;
    resumeSession: () => void;
    conversationStatus: Status;
    messages: Message[];
    setAgentId: (agentId: string) => void;
}>({
    isMicOn: false,
    requestMic: () => { },
    startSession: () => { },
    endSession: () => { },
    pauseSession: () => { },
    resumeSession: () => { },
    conversationStatus: "stopped",
    messages: [],
    setAgentId: () => { },
});

// create a provider that can be used to access the microphone
export function VoiceProvider({ children }: { children: React.ReactNode }) {
    const [isMicOn, setIsMicOn] = useState(false);
    const [conversationStatus, setConversationStatus] = useState<Status>("stopped");
    const [messages, setMessages] = useState<Message[]>([]);
    const [lastAssistantText, setLastAssistantText] = useState<string | undefined>();
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [framework, setFramework] = useState<FrameworkEnum>(FrameworkEnum.react);
    const [agentId, setAgentId] = useState<string>("agent_8101k6ryej6nf3v8c47f035d094p");

    const interval = useRef<NodeJS.Timeout | null>(null);
    const redirectLink = useRef<string | null>(null);

    const createCoachingPlan = useAction(api.agentuity.createCoachingPlan);

    const conversation = useConversation({
        agentId: agentId,
        connectionType: 'webrtc',
        onMessage: (message: any) => {
            console.log("Message", message);
            // emit the message as custom event
            window.dispatchEvent(new CustomEvent("conversation_message", { detail: message }));
            
        },
        clientTools: {
            set_framework: (framework: any) => {
                console.log("Setting framework", framework.framework);
                if (!Object.values(FrameworkEnum).includes(framework.framework)) {
                    throw new Error("Invalid framework");
                }
                localStorage.setItem("framework", JSON.stringify(framework.framework));
                setFramework(framework.framework);
                return "Framework set";
            },
            create_plan: async (prompt: any) => {
                console.log("Creating plan", framework, prompt);
                const plan = await createCoachingPlan({
                    framework: framework ?? FrameworkEnum.react,
                    goal: prompt.prompt,
                });
                localStorage.setItem("plan", JSON.stringify(plan));
                localStorage.setItem("files", JSON.stringify({}));

                setTimeout(() => {
                    redirectLink.current = "/code";
                }, 1000);

                return "Plan created";
            },
            send_plan: (plan: string) => {
                console.log("Plan", plan);

                setTimeout(() => {
                    redirectLink.current = "/code";
                }, 1000);
                return "Session will be loaded";
            },
            get_context: () => {
                const context = localStorage.getItem("context") ?? "{}";
                console.log("Context", context);
                return JSON.parse(context);
            },
        },
    });

    useEffect(() => {
        if (!conversation.isSpeaking && redirectLink.current) {
            console.log("Redirecting to", redirectLink.current);
            window.location.href = redirectLink.current;
        }
    }, [conversation.isSpeaking]);

    const startSession = useCallback(() => {
        console.log("Starting session");
        setConversationStatus("starting");
        conversation.startSession().then(() => {
            setConversationStatus("started");
        });
    }, [conversation]);

    const endSession = useCallback(() => {
        conversation.endSession().then(() => {
            setConversationStatus("stopped");
        });
    }, [conversation]);

    const pauseSession = useCallback(() => {
        if (isPaused || interval.current) return;

        conversation.micMuted = true;
        interval.current = setInterval(() => {
            conversation.sendUserActivity();
        }, 1000);
        setIsPaused(true);
        setConversationStatus("paused");
    }, [conversation, isPaused]);

    const resumeSession = useCallback(() => {
        if (!isPaused || !interval.current) return;

        conversation.micMuted = false;
        clearInterval(interval.current);
        interval.current = null;
        setIsPaused(false);
        setConversationStatus("started");
    }, [conversation, isPaused]);

    const requestMic = useCallback(async () => {
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
            console.log("Mic granted");
            setIsMicOn(true);
        } catch (error) {
            console.error("Mic denied", error);
            setIsMicOn(false);
        }

    }, []);

    useEffect(() => {
        requestMic();
    }, [requestMic]);

    useEffect(() => {
        const handleMessage = (message: CustomEvent) => {
            console.log("Messages", messages);
            setMessages(prev => [...prev, message.detail]);
            if (message.detail.source === "agent") {
                setLastAssistantText(message.detail.message);
            }
            localStorage.setItem("conversation", JSON.stringify([...messages, message.detail]));
        };

        window.addEventListener("conversation_message", handleMessage as EventListener);
        return () => window.removeEventListener("conversation_message", handleMessage as EventListener);
    }, [messages]);

    return (
        <VoiceContext.Provider value={{ 
            isMicOn, 
            requestMic, 
            startSession, 
            endSession, 
            conversationStatus, 
            pauseSession, 
            resumeSession, 
            messages, 
            setAgentId
        }}>
            {children}
        </VoiceContext.Provider>
    );
}