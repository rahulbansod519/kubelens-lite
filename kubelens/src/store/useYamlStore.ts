import { create} from 'zustand'
import type { KubernetesResource } from '../types/kubernetes';

interface YamlStore {
    yaml: string;
    setYaml: (yaml: string) => void;
    selectedResource: KubernetesResource | null;
    setSelectedResource: (resources: any) => void;
}

const defaultYaml = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  selector:
    matchLabels:
      app: nginx

---
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
`;

export const useYamlStore = create<YamlStore>((set) => ({
  yaml: defaultYaml,

  setYaml: (value) =>
    set({
      yaml: value,
    }),

    selectedResource: null,
    
    setSelectedResource: (
      resources
    ) => 
      set({
      selectedResource: resources,
    }),
}));