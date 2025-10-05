import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackPreview,
    SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import ChatBox from "./chat-box";

// create a code editor component
export default function CodeEditor({ files }: { files: Record<string, string> }) {

    return (
        <SandpackProvider
            files={files}
            theme="dark"
            template="react"
            style={{ height: "100%" }}
            options={{
                classes: {
                    "sp-wrapper": "h-screen w-screen",
                    "sp-layout": "h-full w-full",
                    "sp-tab-button": "custom-tab",
                },
            }}
        >
            <SandpackLayout >
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel defaultSize={20} minSize={10}>
                        <SandpackFileExplorer style={{ height: "100%" }} />
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