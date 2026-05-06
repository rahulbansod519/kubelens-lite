import { X } from "lucide-react";

import { useYamlStore } from "../../store/useYamlStore";

function InspectorPanel() {
  const { selectedResource, setSelectedResource } = useYamlStore();

  if (!selectedResource) return null;

  return (
    <div className="fixed top-0 right-0 w-[400px] h-screen bg-slate-950 border-l border-slate-800 shadow-2xl z-50 flex flex-col">
      <div className="h-14 border-b border-slate-800 flex items-center justify-between px-4">
        <h2 className="font-semibold">Resource Details</h2>

        <button
          onClick={() => setSelectedResource(null)}
          className="text-slate-400 hover:text-white"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        <div>
          <p className="text-slate-400 text-sm">Kind</p>

          <p className="text-white">{selectedResource.kind}</p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Name</p>

          <p className="text-white">{selectedResource.metadata?.name}</p>
        </div>

        <div>
          <p className="text-slate-400 text-sm mb-2">Raw JSON</p>

          <pre className="bg-slate-900 border border-slate-800 p-3 rounded-lg text-xs overflow-auto">
            {JSON.stringify(selectedResource, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default InspectorPanel;
