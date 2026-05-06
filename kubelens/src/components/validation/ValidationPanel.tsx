import { AlertTriangle } from "lucide-react";

import { useYamlStore } from "../../store/useYamlStore";

import { parseYamlDocuments } from "../../parser/yamlParser";

import { validateResources } from "../../parser/validators";

function ValidationPanel() {
  const { yaml } = useYamlStore();

  const { resources, errors } = parseYamlDocuments(yaml);

  const issues = validateResources(resources);

  return (
    <div className="h-full overflow-auto p-4">
      <h2 className="font-semibold mb-4">Validation Issues</h2>

      {errors && (
        <div className="bg-red-950 border border-red-700 text-red-400 p-3 rounded-lg mb-4">
          ❌ {errors}
        </div>
      )}

      {!errors && issues.length === 0 && (
        <div className="text-emerald-400">✅ No validation issues</div>
      )}

      <div className="space-y-3">
        {issues.map((issue, index) => (
          <div
            key={index}
            className="
              bg-slate-900
              border
              border-slate-800
              rounded-lg
              p-3
              flex
              gap-3
            "
          >
            <AlertTriangle
              size={18}
              className={
                issue.severity === "error" ? "text-red-400" : "text-yellow-400"
              }
            />

            <div>
              <p className="text-white text-sm">{issue.message}</p>

              {issue.resource && (
                <p className="text-slate-400 text-xs mt-1">
                  Resource: {issue.resource}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ValidationPanel;
