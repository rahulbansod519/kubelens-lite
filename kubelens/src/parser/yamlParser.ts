import yaml from "js-yaml";
import type { KubernetesResource } from "../types/kubernetes";

interface ParseResult {
    resources: KubernetesResource[];
    errors: string | null;
}

export function parseYamlDocuments(
    yamlContent: string
): ParseResult {
    try {
        const documents = yaml.loadAll(yamlContent);

        return {
            resources: documents.filter(Boolean) as KubernetesResource[],
            errors: null
        };
    } catch (error) {
        
        return {
            resources: [],
            errors: "Failed to parse YAML content"
        };
    }
}
        