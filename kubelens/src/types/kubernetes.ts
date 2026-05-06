export interface KubernetesResource {
  apiVersion?: string;
  kind: string;

  metadata?: {
    name?: string;
    labels?: Record<string, string>;
  };

  spec?: any;
  
}
