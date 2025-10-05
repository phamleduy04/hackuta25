// create a context that can be used to access the microphone

import { Role, useConversation, VoiceConversation } from "@elevenlabs/react";
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
    setFirstMessage: (message: string) => void;
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
    setFirstMessage: () => { },
});

// create a provider that can be used to access the microphone
export function VoiceProvider({ children }: { children: React.ReactNode }) {
    const [isMicOn, setIsMicOn] = useState(false);
    const [conversationStatus, setConversationStatus] = useState<Status>("stopped");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [framework, setFramework] = useState<FrameworkEnum>(FrameworkEnum.react);

    const [agentId, setAgentId] = useState<string>("agent_8101k6ryej6nf3v8c47f035d094p");
    const [firstMessage, setFirstMessage] = useState<string>("");

    const interval = useRef<NodeJS.Timeout | null>(null);
    const redirectLink = useRef<string | null>(null);

    const createCoachingPlan = useAction(api.agentuity.createCoachingPlan);

    const conversation = useConversation({
        // agentId: 'agent_7801k6re9566f1990zee8hcy45k3',
        agentId: agentId,
        connectionType: 'webrtc', // either "webrtc" or "websocket"
        onMessage: (message) => {
            window.dispatchEvent(new CustomEvent("conversation-message", {
                detail: {
                    message: message,
                }
            }));
        },
        clientTools: {
            set_framework: (framework: any) => {
                console.log("Setting framework", framework.framework);
                if (!Object.values(FrameworkEnum).includes(framework.framework)) {
                    throw new Error("Invalid framework");
                }
                window.dispatchEvent(new CustomEvent("framework", {
                    detail: {
                        framework: framework.framework,
                    }
                }));
                return "Framework set";
            },
            create_plan: (prompt: any) => {
                console.log("Creating plan", framework, prompt);
                createCoachingPlan({
                    framework: framework ?? FrameworkEnum.react,
                    goal: prompt.prompt,
                }).then((plan) => {
                    localStorage.setItem("plan", JSON.stringify(plan));
                    return "Plan created";
                });
            },
            send_plan: (plan: string) => {
                console.log("Plan", plan);

                // save the framework, plan, and conversation to local storage
                localStorage.setItem("framework", JSON.stringify(framework));
                localStorage.setItem("conversation", JSON.stringify(messages));

                setTimeout(() => {
                    window.dispatchEvent(new CustomEvent("load-session", {
                        detail: {
                            link: "/code",
                        }
                    }));
                }, 1000);
            },
            get_context: () => {
                // get context from local storage
                const context = localStorage.getItem("context") ?? "";
                console.log("Context", context);
                return JSON.parse(context);
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

        // mute the mic
        conversation.micMuted = true;

        interval.current = setInterval(() => {
            conversation.sendUserActivity();
        }, 1000);
        setIsPaused(true);
        setConversationStatus("paused");
    }, [conversation]);

    const resumeSession = useCallback(() => {
        if (!isPaused || !interval.current) return;

        // unmute the mic
        conversation.micMuted = false;

        clearInterval(interval.current);
        interval.current = null;
        setIsPaused(false);
        setConversationStatus("started");
    }, [conversation]);

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

    return (<VoiceContext.Provider value={{ isMicOn, requestMic, startSession, endSession, conversationStatus, pauseSession, resumeSession, messages, setAgentId, setFirstMessage }}>
        {children}
    </VoiceContext.Provider>);
}