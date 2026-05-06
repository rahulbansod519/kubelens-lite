import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

import { useYamlStore } from "../../store/useYamlStore";
import { parseYamlDocuments } from "../../parser/yamlParser";
import { mapResourcesToNodes } from "../../parser/resourceMapper";

import { mapResourcesToEdges } from "../../parser/edgeMapper";
import KubernetesNode from "./nodes/kubernetesNodes";

import { layoutGraph } from "../../parser/layoutGraph";

const nodeTypes = {
  kubernetesNode: KubernetesNode,
};

function GraphPanel() {
  const { yaml } = useYamlStore();

  const { resources } = parseYamlDocuments(yaml);
  const rawNodes = mapResourcesToNodes(resources);

  const edges = mapResourcesToEdges(resources);

  const nodes = layoutGraph(rawNodes, edges);

  return (
    <div className="h-full">
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default GraphPanel;
