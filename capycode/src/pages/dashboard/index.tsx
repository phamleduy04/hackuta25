
import "./dashboard.css";
import Dashboard from "./dashboard";
import { VoiceProvider } from "@/contexts/voice-context";

export default function DashboardWrapper() {
  
  return (
    <VoiceProvider>
      <Dashboard />
    </VoiceProvider>
  );
}