---
name: figma
description: Design-to-code operations, component mapping, and diagram-oriented documentation workflows.
metadata:
  version: '1.0.0'
  status: active
  owner: squad-app
  tags: [figma, ui, design-system, code-connect]
---

# Skill: Figma Integration

## When to use

- Convert Figma designs into React Native components.
- Extract design tokens and map design components to code.
- Create visual documentation diagrams.

## When not to use

- Backend or non-UI implementation tasks.

## Inputs

- Figma URL, file key, node ID, target component path.

## Outputs

- UI implementation guidance/code structure.
- Token extraction references.
- Mapping between design nodes and code artifacts.

## Allowed tools

- Figma MCP tools.
- Workspace search/read tools for target component context.

## Constraints and guardrails

- Preserve project visual language where established.
- Prefer reusable shared components (`src/shared/presentation/components/`).
- Keep accessibility and testIDs in delivered UI guidance.
- Place feature-specific components in `src/features/[feature]/presentation/components/`; only promote to `shared` when 2+ features need it.

## Usage examples

```markdown
/ui implementar design do Figma [URL]
/ui gerar código React Native para node 1:2
/ui mapear componente Figma para src/features/place/presentation/components/PlaceCard/index.tsx
```
