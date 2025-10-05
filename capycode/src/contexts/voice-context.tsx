// create a context that can be used to access the microphone

import { Role, useConversation, VoiceConversation } from "@elevenlabs/react";
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
}>({
    isMicOn: false,
    requestMic: () => { },
    startSession: () => { },
    endSession: () => { },
    pauseSession: () => { },
    resumeSession: () => { },
    conversationStatus: "stopped",
    messages: [],
});

// create a provider that can be used to access the microphone
export function VoiceProvider({ children }: { children: React.ReactNode }) {
    const [isMicOn, setIsMicOn] = useState(false);
    const [conversationStatus, setConversationStatus] = useState<Status>("stopped");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [framework, setFramework] = useState<FrameworkEnum>(FrameworkEnum.react);

    const interval = useRef<NodeJS.Timeout | null>(null);
    const redirectLink = useRef<string | null>(null);

    const conversation = useConversation({
        agentId: 'agent_7801k6re9566f1990zee8hcy45k3',
        connectionType: 'webrtc', // either "webrtc" or "websocket"
        onMessage: (message) => {
            window.dispatchEvent(new CustomEvent("conversation-message", {
                detail: {
                    message: message,
                }
            }));
        },
        clientTools: {
            set_framework: (framework: FrameworkEnum) => {
                if (!Object.values(FrameworkEnum).includes(framework)) {
                    throw new Error("Invalid framework");
                }
                window.dispatchEvent(new CustomEvent("framework", {
                    detail: {
                        framework: framework,
                    }
                }));
                return "Framework set";
            },
            send_plan: (plan: string) => {
                console.log("Plan", plan);

                // save the framework, plan, and conversation to local storage
                localStorage.setItem("framework", JSON.stringify(framework));
                localStorage.setItem("plan", JSON.stringify(plan));
                localStorage.setItem("conversation", JSON.stringify(messages));

                setTimeout(() => {
                    window.dispatchEvent(new CustomEvent("load-session", {
                        detail: {
                            link: "/code",
                        }
                    }));
                }, 1000);
            },
        },
    });

    useEffect(() => {

        if (!conversation.isSpeaking && redirectLink.current) {
            window.location.href = redirectLink.current;
            console.log("Redirecting to", redirectLink.current);
            return;
        }

    }, [conversation.isSpeaking]);

    const startSession = () => {
        console.log("Starting session");
        setConversationStatus("starting");
        conversation.startSession().then(() => {
            setConversationStatus("started");
        });
    }
    const endSession = () => {
        conversation.endSession().then(() => {
            setConversationStatus("stopped");
        });
    }

    const pauseSession = () => {
        if (isPaused || interval.current) return;

        // mute the mic
        conversation.micMuted = true;

        interval.current = setInterval(() => {
            conversation.sendUserActivity();
        }, 1000);
        setIsPaused(true);
        setConversationStatus("paused");
    }

    const resumeSession = () => {
        if (!isPaused || !interval.current) return;

        // unmute the mic
        conversation.micMuted = false;

        clearInterval(interval.current);
        interval.current = null;
        setIsPaused(false);
        setConversationStatus("started");
    }

    useEffect(() => {
        // check if the mic is on
        navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
            console.log("Mic granted");
            setIsMicOn(true);
        }).catch((error) => {
            console.error("Mic denied", error);
            setIsMicOn(false);
        });

        const loadSession = (event: CustomEvent) => {
            console.log("Loading session", event.detail.link);
            redirectLink.current = event.detail.link;
        }

        const handleFramework = (event: CustomEvent) => {
            console.log("Framework", event.detail.framework);
            setFramework(event.detail.framework);
        }

        window.addEventListener("load-session", loadSession as unknown as EventListener);
        window.addEventListener("framework", handleFramework as unknown as EventListener);

        return () => {
            window.removeEventListener("load-session", loadSession as unknown as EventListener);
            window.removeEventListener("framework", handleFramework as unknown as EventListener);
        }
    }, []);

    useEffect(() => {
        console.log("Messages", messages);
        const handleMessage = (event: CustomEvent) => {
            console.log("Message", event.detail.message);
            setMessages([...messages, event.detail.message]);
        }
        window.addEventListener("conversation-message", handleMessage as unknown as EventListener);
        return () => {
            window.removeEventListener("conversation-message", handleMessage as unknown as EventListener);
        }
    }, [messages]);

    const requestMic = (async () => {
        await navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
            console.log("Mic granted");
            setIsMicOn(true);
        }).catch((error) => {
            console.error("Mic denied", error);
            setIsMicOn(false);
        });
    });

    return (<VoiceContext.Provider value={{ isMicOn, requestMic, startSession, endSession, conversationStatus, pauseSession, resumeSession, messages }}>
        {children}
    </VoiceContext.Provider>);
}