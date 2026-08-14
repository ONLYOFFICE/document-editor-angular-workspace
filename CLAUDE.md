# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Angular workspace containing a reusable npm library (`@onlyoffice/document-editor-angular`) for integrating ONLYOFFICE Document Server. Currently targets **Angular 20** on branch `feature/angular-v-20`.

## Build & Development Commands

```bash
# Install dependencies
npm install

# Build library
ng build @onlyoffice/document-editor-angular

# Run library tests
ng test @onlyoffice/document-editor-angular
```

## Architecture

### Monorepo Structure

- **`projects/onlyoffice/document-editor-angular/`** — Publishable library (NgModule-based, built with ng-packagr)
- **`dist/`** — Build output for the library

### Library (`@onlyoffice/document-editor-angular`)

Core component: `DocumentEditorComponent` (selector: `<document-editor>`)
- Exported via `DocumentEditorModule`
- Key inputs: `id`, `documentServerUrl`, `config` (IConfig), plus 20+ event handler inputs
- Dynamically loads the DocsAPI script from the document server (`utils/loadScript.ts`)
- Uses lodash `cloneDeep` for config handling; extends `Window` interface for `DocsAPI`/`DocEditor`
- Public API surface defined in `src/public-api.ts`

## Conventions

- **Commits**: Conventional Commits format
- **Testing**: Karma + Jasmine, Chrome browser
- **TypeScript**: Strict mode enabled, ES2022 target
- **Library versioning**: Major version tracks Angular compatibility (v7.x = Angular 20)
