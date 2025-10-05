import { Button } from "@/components/ui/button";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ResultsOverlay({ result, close }: { result: string | null, close: () => void }) {

    if (!result) return null;
    return (
        <div className="fixed dark inset-0 bg-black/25 bg-opacity-50 flex justify-center items-center z-50 animate-in fade-in-0 fade-out-0" onClick={close}>
            <div className="max-w-3xl w-full h-max p-4 gap-4 flex flex-col backdrop-blur-xl relative overflow-hidden rounded-xl" onClick={(e) => e.stopPropagation()}>
                <div className="absolute top-0 right-0 w-full h-full opacity-75 -z-10" style={{
                    backgroundColor: "var(--sp-colors-surface2) !important",
                }} />
                <h1 className="text-2xl font-bold">Feedback</h1>
                <Markdown remarkPlugins={[remarkGfm]}>{result}</Markdown>
                <Button onClick={close}>Close</Button>
            </div>
        </div>
    )
}