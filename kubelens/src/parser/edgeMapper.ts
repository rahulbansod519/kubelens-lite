import type { Edge } from "reactflow";
import { MarkerType } from "reactflow";
import type { KubernetesResource } from "../types/kubernetes";

export function mapResourcesToEdges(
  resources: KubernetesResource[]
): Edge[] {
  const edges: Edge[] = [];

  const deployments = resources.filter(
    (resource) => resource.kind === "Deployment"
  );

  const services = resources.filter(
    (resource) => resource.kind === "Service"
  );

  const ingresses = resources.filter(
    (resource) => resource.kind === "Ingress"
  );

  services.forEach((service) => {
    const selector = service.spec?.selector;

    deployments.forEach((deployment) => {
      const labels = deployment.spec?.template?.metadata?.labels;

      const isMatch =
        selector &&
        labels &&
        Object.keys(selector).every(
          (key) => selector[key] === labels[key]
        );

      if (!isMatch) {
        return;
      }

      const serviceName = service.metadata?.name;
      const deploymentName = deployment.metadata?.name;

      if (!serviceName || !deploymentName) {
        return;
      }

      edges.push({
        id: `${serviceName}-${deploymentName}`,
        source: serviceName,
        target: deploymentName,
        animated: true,
        type: "smoothstep",
        style: {
          stroke: "#888",
          strokeWidth: 2,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: "#888",
        },
      });
    });
  });

  ingresses.forEach((ingress) => {
    const paths =
      ingress.spec?.rules?.flatMap((rule: any) => rule.http?.paths || []) || [];

    paths.forEach((path: any) => {
      const serviceName = path.backend?.service?.name;
      if (!serviceName) {
        return;
      }

      const ingressName = ingress.metadata?.name;
      if (!ingressName) {
        return;
      }

      edges.push({
        id: `${ingressName}-${serviceName}`,
        source: ingressName,
        target: serviceName,
        animated: true,
        type: "smoothstep",
        style: {
          stroke: "#a855f7",
          strokeWidth: 2,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      });
    });
  });
  deployments.forEach((deployment) => {

  const containers =
    deployment.spec?.template?.spec?.containers || [];

  containers.forEach((container: any) => {

    const envFrom =
      container.envFrom || [];

    envFrom.forEach((env: any) => {

      const configMapName =
        env.configMapRef?.name;

      if (!configMapName)
        return;

      const deploymentName =
        deployment.metadata?.name;

      if (!deploymentName)
        return;

      edges.push({

        id:
          `${configMapName}-${deploymentName}`,

        source: configMapName,

        target: deploymentName,

        animated: true,

        type: "smoothstep",

        style: {
          stroke: "#f59e0b",
          strokeWidth: 2,
          strokeDasharray: "5 5",
        },

        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      });
    });
  });
});
  return edges;
}
