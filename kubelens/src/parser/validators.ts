import type { KubernetesResource } from "../types/kubernetes";

export interface ValidationIssue {
  severity: "error" | "warning";

  message: string;

  resource?: string;
}

export function validateResources(
  resources: KubernetesResource[],
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  const deployments = resources.filter((r) => r.kind === "Deployment");

  const services = resources.filter((r) => r.kind === "Service");

  // -----------------------------------
  // Service selector validation
  // -----------------------------------

  services.forEach((service) => {
    const selector = service.spec?.selector;

    const serviceName = service.metadata?.name;

    const hasMatch = deployments.some((deployment) => {
      const labels = deployment.spec?.template?.metadata?.labels;

      return (
        selector &&
        labels &&
        Object.keys(selector).every((key) => selector[key] === labels[key])
      );
    });

    if (!hasMatch) {
      issues.push({
        severity: "error",

        resource: serviceName,

        message: "Service selector does not match any Deployment",
      });
    }
  });

  // -----------------------------------
  // Missing replicas
  // -----------------------------------

  deployments.forEach((deployment) => {
    const replicas = deployment.spec?.replicas;

    if (replicas === undefined) {
      issues.push({
        severity: "warning",

        resource: deployment.metadata?.name,

        message: "Deployment missing replicas count",
      });
    }
  });

  // -----------------------------------
  // Missing container ports
  // -----------------------------------

  deployments.forEach((deployment) => {
    const containers = deployment.spec?.template?.spec?.containers;

    const hasPorts = containers?.some(
      (container: any) => container.ports?.length > 0,
    );

    if (!hasPorts) {
      issues.push({
        severity: "warning",

        resource: deployment.metadata?.name,

        message: "Container ports not defined",
      });
    }
  });

  return issues;
}
