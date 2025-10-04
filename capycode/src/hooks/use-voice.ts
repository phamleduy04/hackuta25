import { VoiceContext } from "@/contexts/voice-context";
import { useContext } from "react";

export function useVoice() {
    return useContext(VoiceContext);
}