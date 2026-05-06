import type { Node } from "reactflow";
import type { KubernetesResource } from "../types/kubernetes";

export function mapResourcesToNodes(
  resources: KubernetesResource[]
): Node[] {

  return resources.map((resource, index) => {

    const name =
      resource.metadata?.name || `unknown-${index}`;

    return {
      id: name,

      position: {
        x: 100,
        y: index * 120,
      },

      data: {
        kind: resource.kind,
        name,
        resource,
      },

      type: "kubernetesNode",
    };
  });
}