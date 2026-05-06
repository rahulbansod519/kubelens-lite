import { Handle, Position } from "reactflow";
import type { KubernetesResource } from "../../../types/kubernetes";
import { useYamlStore } from "../../../store/useYamlStore";

interface KubernetesNodeProps {
  data: {
    kind: string;
    name: string;
    resource: KubernetesResource;
  };
}

const kindStyles: Record<
  string,
  {
    icon: string;
    border: string;
    text: string;
  }
> = {

  Deployment: {
    icon: "🚀",
    border: "border-sky-500",
    text: "text-sky-400",
  },

  Service: {
    icon: "🌐",
    border: "border-emerald-500",
    text: "text-emerald-400",
  },

  Ingress: {
    icon: "🛡️",
    border: "border-violet-500",
    text: "text-violet-400",
  },

  ConfigMap: {
    icon: "📦",
    border: "border-amber-500",
    text: "text-amber-400",
  },
};

function KubernetesNode({
  data,
}: KubernetesNodeProps) {

  const style =
    kindStyles[data.kind] || {
      icon: "📄",
      border: "border-slate-600",
      text: "text-slate-300",
    };

    const setSelectedResource =
    useYamlStore(
      (state) => state.setSelectedResource
    );

  return (
    <div
      onClick={() => setSelectedResource(data.resource)}
      className={`
        bg-slate-900
        border
        ${style.border}
        rounded-xl
        min-w-[220px]
        shadow-lg
      `}
    >

      <Handle
        type="target"
        position={Position.Top}
      />

      <div className="border-b border-slate-700 px-4 py-2 flex items-center gap-2">

        <span className="text-lg">
          {style.icon}
        </span>

        <p
          className={`text-sm font-semibold ${style.text}`}
        >
          {data.kind}
        </p>

      </div>

      <div className="px-4 py-3">

        <p className="text-sm text-white font-medium">
          {data.name}
        </p>

      </div>

      <Handle
        type="source"
        position={Position.Bottom}
      />

    </div>
  );
}

export default KubernetesNode;