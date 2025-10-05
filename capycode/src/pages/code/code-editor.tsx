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
import { useEffect, useState } from "react";
import { FrameworkEnum } from "@/contexts/voice-context";
import { Input } from "@/components/ui/input";
import { useVoice } from "@/hooks/use-voice";


export function createInitialMessage(files: Record<string, string>, template: FrameworkEnum, plan: string) {
    // create a message from the user to the ai with the files, template, and plan
    console.log("Creating initial message", files, template, plan);


    const initialMessage = `I have the following files: ${JSON.stringify(files)}\nI am using the following template: ${template}\nI have the following plan: ${plan}`;
    localStorage.setItem("context", JSON.stringify({
        files: files,
        template: template,
        plan: plan,
    }));
    return initialMessage;
}


// create a code editor component
export default function CodeEditor() {
    const { setAgentId, setFirstMessage } = useVoice();

    const [template, setTemplate] = useState<FrameworkEnum>(FrameworkEnum.react);
    const [plan, setPlan] = useState<string>("");
    const [allViewableFiles, setAllViewableFiles] = useState<Record<string, string>>({});

    useEffect(() => {

        if (Object.keys(allViewableFiles).length > 0) {

            const framework_stored = window.localStorage.getItem("framework");
            const plan_stored = window.localStorage.getItem("plan");
            if (framework_stored && plan_stored) {
                setTemplate(JSON.parse(framework_stored) as FrameworkEnum);
                setPlan(JSON.parse(plan_stored));
                createInitialMessage(allViewableFiles, JSON.parse(framework_stored) as FrameworkEnum, JSON.parse(plan_stored));
            }

            setAgentId("agent_7801k6re9566f1990zee8hcy45k3");
        }
    }, [allViewableFiles]);

    const [folderName, setFolderName] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");

    const addFolder = () => {
        const tmpFolder = folderName.length > 0 ? folderName : "New Folder";
        setAllViewableFiles({ ...allViewableFiles, [`/${tmpFolder}/`]: "" });
    }
    const addFile = () => {
        const tmpFile = fileName.length > 0 ? fileName : "New File";
        setAllViewableFiles({ ...allViewableFiles, [`/${tmpFile}`]: "" });
    }



    return (
        <SandpackProvider
            theme="dark"
            template={template}
            style={{ height: "100%" }}
            options={{
                classes: {
                    "sp-wrapper": "h-screen w-screen",
                    "sp-layout": "h-full w-full",
                    "sp-tab-button": "custom-tab",
                },
            }}
        >
            <TestComponent setAllViewableFiles={setAllViewableFiles} />
            <SandpackLayout >
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel defaultSize={20} minSize={10} className="relative">
                        <SandpackFileExplorer style={{ height: "100%" }} />
                        <div className="absolute bottom-0 w-full p-2 gap-2 flex flex-col">
                            {/* <Input className="w-full" placeholder="Folder Name" value={folderName} onChange={(e) => setFolderName(e.target.value)} />
                            <Button className="w-full" variant="outline" onClick={addFolder}>Add Folder</Button> */}
                            <Input className="w-full" placeholder="File Name" value={fileName} onChange={(e) => setFileName(e.target.value)} />
                            <Button className="w-full" onClick={addFile}>Add File</Button>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={40}>
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
                                <ChatBox />
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </SandpackLayout>
        </SandpackProvider>
    )
}

function TestComponent({ setAllViewableFiles }: { setAllViewableFiles: (files: Record<string, string>) => void }) {

    const { sandpack } = useSandpack();
    const { files: sandpackFiles } = sandpack;

    useEffect(() => {
        console.log("Sandpack files", sandpackFiles);
        setAllViewableFiles(JSON.parse(JSON.stringify(sandpackFiles)));
    }, [sandpackFiles, setAllViewableFiles]);

    return null;
}