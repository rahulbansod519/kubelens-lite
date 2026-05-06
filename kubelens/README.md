# Kubelens Lite

A lightweight React + TypeScript + Vite project for visualizing Kubernetes resources.

## What this project does

- parses Kubernetes YAML manifests
- maps Services, Deployments, Ingresses, ConfigMaps, and other resources
- renders an interactive graph using React Flow
- supports layout and custom edge styling for relationships

## Tech stack

- React 19
- TypeScript 6
- Vite
- React Flow
- Tailwind CSS (v4)
- Dagre for graph layout
- ESLint for linting

## Getting started

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Notes

- The project uses `@tailwindcss/cli` and `@tailwindcss/vite` for Tailwind v4 integration.
- Type declarations for `js-yaml` and `dagre` are installed as dev dependencies.
- If you change TypeScript types or package imports, reload the editor / TypeScript server.

## Project structure

- `src/` – application source code
- `src/parser/` – YAML parsing and graph mapping utilities
- `src/App.tsx` – main app entry
- `vite.config.ts` – Vite configuration
- `package.json` – scripts and dependencies
