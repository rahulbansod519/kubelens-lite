import dagre from "dagre";

import type {
  Node,
  Edge,
} from "reactflow";

const dagreGraph =
  new dagre.graphlib.Graph();

dagreGraph.setDefaultEdgeLabel(
  () => ({})
);

const NODE_WIDTH = 220;
const NODE_HEIGHT = 90;

export function layoutGraph(
  nodes: Node[],
  edges: Edge[]
) {

  dagreGraph.setGraph({
    rankdir: "TB",
  });

  nodes.forEach((node) => {

    dagreGraph.setNode(node.id, {
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
    });
  });

  edges.forEach((edge) => {

    dagreGraph.setEdge(
      edge.source,
      edge.target
    );
  });

  dagre.layout(dagreGraph);

  return nodes.map((node) => {

    const position =
      dagreGraph.node(node.id);

    return {
      ...node,

      position: {
        x: position.x,
        y: position.y,
      },
    };
  });
}