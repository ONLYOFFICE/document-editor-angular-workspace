# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Angular workspace containing a reusable npm library (`@onlyoffice/document-editor-angular`) for integrating ONLYOFFICE Document Server, plus a demo application. Currently targets **Angular 20** on branch `feature/angular-v-20`.

## Build & Development Commands

```bash
# Install dependencies
npm install

# Serve demo app (dev server)
ng serve

# Build library (must build before app if using local reference)
ng build @onlyoffice/document-editor-angular

# Build demo app
ng build

# Run tests
ng test                                          # demo app tests
ng test @onlyoffice/document-editor-angular      # library tests

# Storybook (component documentation)
npm run storybook          # dev server on port 6006
npm run build-storybook    # static build

# Generate compodoc documentation
npm run docs:json
```

## Architecture

### Monorepo Structure

- **`src/`** — Demo application (standalone components, bootstrapped via `bootstrapApplication`)
- **`projects/onlyoffice/document-editor-angular/`** — Publishable library (NgModule-based, built with ng-packagr)
- **`dist/`** — Build outputs for both library and app
- **`.storybook/`** — Storybook configuration with compodoc integration
- **`config/config.json`** — Runtime config (document server URL, demo storage, oforms API)

### Library (`@onlyoffice/document-editor-angular`)

Core component: `DocumentEditorComponent` (selector: `<document-editor>`)
- Exported via `DocumentEditorModule`
- Key inputs: `id`, `documentServerUrl`, `config` (IConfig), plus 20+ event handler inputs
- Dynamically loads the DocsAPI script from the document server (`utils/loadScript.ts`)
- Uses lodash `cloneDeep` for config handling; extends `Window` interface for `DocsAPI`/`DocEditor`
- Public API surface defined in `src/public-api.ts`

### Demo App

Uses standalone Angular components. Key areas:
- **Comments** — CRUD for comments and replies
- **Content Controls** — Input and radio button controls
- **Forms** — Integration with oforms API via `FormsService`
- **Review** — Change tracking features

Each feature area has corresponding Storybook stories (`*.stories.ts`).

### Path Alias

TypeScript path `onlyoffice/document-editor-angular` maps to `dist/onlyoffice/document-editor-angular` — the library must be built before the app can consume it.

## Conventions

- **Commits**: Conventional Commits enforced via commitlint + lefthook
- **Testing**: Karma + Jasmine, Chrome browser
- **TypeScript**: Strict mode enabled, ES2022 target
- **Library versioning**: Major version tracks Angular compatibility (v7.x = Angular 20)
