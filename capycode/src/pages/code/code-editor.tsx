import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackPreview,
    SandpackFileExplorer,
    useSandpack
} from "@codesandbox/sandpack-react";
import ChatBox from "./chat-box";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { FrameworkEnum } from "@/contexts/voice-context";
import { Input } from "@/components/ui/input";
import { useVoice } from "@/hooks/use-voice";

import { gruvboxDark } from "@codesandbox/sandpack-themes";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import ResultsOverlay from "./results";

function setContext(files: Record<string, string>, template: FrameworkEnum, plan: string) {
    console.log("Setting context", { files, template, plan });
    localStorage.setItem("context", JSON.stringify({
        files,
        template,
        plan,
    }));
}

export default function CodeEditor() {
    const { setAgentId } = useVoice();
    const [template, setTemplate] = useState<FrameworkEnum | null>(null);
    const [allViewableFiles, setAllViewableFiles] = useState<Record<string, string>>({});
    const [fileName, setFileName] = useState<string>("");
    const [customFiles, setCustomFiles] = useState<Record<string, string>>({});
    const [plan, setPlan] = useState<string>("");

    const createCodeResult = useAction(api.result.createCodeResult);

    useEffect(() => {
        const defaultFilesStored = localStorage.getItem("files");
        if (defaultFilesStored) {
            setCustomFiles(JSON.parse(defaultFilesStored));
        }
        const defaultFrameworkStored = localStorage.getItem("framework");
        if (defaultFrameworkStored) {
            setTemplate(JSON.parse(defaultFrameworkStored) as FrameworkEnum);
        }
        setAgentId("agent_7801k6re9566f1990zee8hcy45k3");
    }, []);

    useEffect(() => {
        if (Object.keys(allViewableFiles).length === 0) return;

        const frameworkStored = localStorage.getItem("framework");
        const planStored = localStorage.getItem("plan");

        if (frameworkStored && planStored) {
            const parsedFramework = JSON.parse(frameworkStored) as FrameworkEnum;
            const parsedPlan = JSON.parse(planStored);
            setTemplate(parsedFramework);
            setPlan(parsedPlan);
            setContext(allViewableFiles, parsedFramework, parsedPlan);
        }

    }, [allViewableFiles, setAgentId]);


    const [result, setResult] = useState<string | null>(null);

    const getFeedback = () => {
        createCodeResult({
            code: allViewableFiles,
            tasks: plan,
            framework: template ?? FrameworkEnum.react,
        })
            .then((result) => {
                console.log("Result", result);

                // create/edit a new feedback file
                const feedbackFile: Record<string, string> = {
                    name: "feedback.md",
                    content: result ?? "",
                }
                setCustomFiles(prev => ({ ...prev, [`/feedback.md`]: feedbackFile.content }));
                setResult(result);
            })
            .catch((error) => {
                console.error("Error", error);
            })
    }

    const addFile = () => {
        const newFileName = fileName.trim() || "New File";
        setCustomFiles(prev => ({ ...prev, [`/${newFileName}`]: "" }));
        setFileName("");
    }

    return (
        template && (
            
            <SandpackProvider
                theme={gruvboxDark}
                template={template}
                style={{ height: "100%" }}
                files={customFiles}
                options={{
                    classes: {
                        "sp-wrapper": "h-screen w-screen dark",
                        "sp-layout": "h-full w-full",
                        "sp-tab-button": "custom-tab",
                    },
                }}
            >
                <ResultsOverlay result={result} close={() => setResult(null)} />
                <SandpackFilesSync setAllViewableFiles={setAllViewableFiles} />
                <SandpackLayout >
                    <ResizablePanelGroup direction="horizontal">
                        <ResizablePanel defaultSize={20} minSize={10} className="relative">
                            <SandpackFileExplorer style={{ height: "100%" }} />
                            <div className="absolute bottom-0 w-full p-2 gap-2 flex flex-col">
                                <Input
                                    className="w-full"
                                    placeholder="File Name"
                                    value={fileName}
                                    onChange={(e) => setFileName(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && addFile()}
                                />
                                <Button className="w-full" onClick={addFile}>Add File</Button>
                            </div>
                        </ResizablePanel>
                        <ResizableHandle />
                        <ResizablePanel defaultSize={40} minSize={10}>
                            <SandpackCodeEditor
                                showLineNumbers
                                closableTabs
                                showTabs
                                style={{ height: "100%" }}
                            />
                        </ResizablePanel>
                        <ResizableHandle />
                        <ResizablePanel defaultSize={40} minSize={10}>
                            <ResizablePanelGroup direction="vertical">
                                <ResizablePanel minSize={10}>
                                    <SandpackPreview showNavigator style={{ height: "100%" }} />
                                </ResizablePanel>
                                <ResizableHandle />
                                <ResizablePanel minSize={10}>
                                    <ChatBox getFeedback={getFeedback} />
                                </ResizablePanel>
                            </ResizablePanelGroup>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </SandpackLayout>
            </SandpackProvider>
        )
    )
}

function SandpackFilesSync({ setAllViewableFiles }: { setAllViewableFiles: (files: Record<string, string>) => void }) {
    const { sandpack } = useSandpack();
    const previousFilesRef = useRef<string>("");
    const syncedRef = useRef(false);

    useEffect(() => {
        // Only sync once on mount or when files actually change
        const currentFilesStr = JSON.stringify(sandpack.files);

        if (!syncedRef.current || currentFilesStr !== previousFilesRef.current) {
            console.log("Syncing Sandpack files", sandpack.files);
            setAllViewableFiles(JSON.parse(JSON.stringify(sandpack.files)));
            previousFilesRef.current = currentFilesStr;
            syncedRef.current = true;
        }
    }, [sandpack.files, setAllViewableFiles]);

    return null;
}