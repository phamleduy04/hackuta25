import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackPreview,
    SandpackFileExplorer,
} from "@codesandbox/sandpack-react";

export default function Code() {
    const files = {}

    return (
        <div className="h-full w-full">
            <SandpackProvider
                files={files}
                theme="dark"
                template="angular"
            >
                <SandpackLayout>
                    <SandpackFileExplorer />
                    <SandpackCodeEditor closableTabs showTabs />
                    <SandpackPreview />
                </SandpackLayout>
            </SandpackProvider>
        </div>
    )
}