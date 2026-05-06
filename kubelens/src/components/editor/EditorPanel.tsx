import Editor from "@monaco-editor/react";
import { useYamlStore } from "../../store/useYamlStore";


function EditorPanel() {
    const { yaml, setYaml } = useYamlStore()

    return (

        <div className="h-full flex flex-col">
                <div className="h-12 border-b border-slate-800 flex items-center px-4">
                    <h2 className="font-semibold">
                        Kubernetes YAML
                    </h2>
                </div>

            <div className="flex-1">
                <Editor
                   height="100%"
                   defaultLanguage="yaml"
                   theme="vs-dark"
                   value={yaml}
                   onChange={(value) => setYaml(value || "")}
                   options={{
                    minimap: {
                        enabled: false,
                    },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    wordWrap: "on"
                   }} 
                
                />

            </div>
        </div>
       
    );

}

export default EditorPanel