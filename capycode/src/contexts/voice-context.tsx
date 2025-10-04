// create a context that can be used to access the microphone

import { useConversation, VoiceConversation } from "@elevenlabs/react";
import { createContext, useEffect, useState } from "react";

export type Status = "started" | "stopped";

export const VoiceContext = createContext<{
    isMicOn: boolean;
    requestMic: () => void;
    startSession: () => void;
    endSession: () => void;
    conversationStatus: Status;
}>({
    isMicOn: false,
    requestMic: () => {},
    startSession: () => {},
    endSession: () => {},
    conversationStatus: "stopped",
    });

// create a provider that can be used to access the microphone
export function VoiceProvider({ children }: { children: React.ReactNode }) {
    const [isMicOn, setIsMicOn] = useState(false);
    const [conversationStatus, setConversationStatus] = useState<Status>("stopped");

    const conversation = useConversation({
        agentId: 'agent_7801k6re9566f1990zee8hcy45k3',
        connectionType: 'webrtc', // either "webrtc" or "websocket"
    });

    const startSession = () => {
        conversation.startSession().then(() => {
            setConversationStatus("started");
        });
    }
    const endSession = () => {
        conversation.endSession().then(() => {
            setConversationStatus("stopped");
        });
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
    }, []);

    const requestMic = (async () => {
        await navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
            console.log("Mic granted");
            setIsMicOn(true);
        }).catch((error) => {
            console.error("Mic denied", error);
            setIsMicOn(false);
        });
    });

    return (<VoiceContext.Provider value={{ isMicOn, requestMic, startSession, endSession, conversationStatus }}>
        {children}
    </VoiceContext.Provider>);
}