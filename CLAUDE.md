# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository purpose

This is the Angular CLI workspace for `@onlyoffice/document-editor-angular`, a single published
Angular library component that embeds ONLYOFFICE Document Server into Angular applications. The
workspace contains exactly one project — there is no demo/sandbox app in this repo.

## Commands

All Angular CLI commands must target the library by its full scoped name (there's only one project,
but `ng` still requires the name since there's no `defaultProject`).

```
npm install                                          # install workspace dependencies

ng build @onlyoffice/document-editor-angular         # build the library -> dist/onlyoffice/document-editor-angular
ng test @onlyoffice/document-editor-angular          # run the full Karma/Jasmine test suite

cd dist/onlyoffice/document-editor-angular
npm pack                                             # produce the publishable tarball from the build output
```

To run a single spec file, use Karma's file filter via `--include`, e.g.:
```
ng test @onlyoffice/document-editor-angular --include='**/document-editor.component.spec.ts'
```

There is no lint script configured in `package.json`.

## Architecture

- `projects/onlyoffice/document-editor-angular/` is the only library project (`root`/`sourceRoot` in
  `angular.json`). Its own `package.json` is the manifest that actually gets published to npm (version,
  peerDependencies on `@angular/common`/`@angular/core`/`@onlyoffice/doceditor-types`, and the `lodash`
  runtime dependency) — it is separate from the workspace root `package.json`.
- `ng-package.json` (ng-packagr config) declares the library entry point (`src/public-api.ts`) and
  build destination (`dist/onlyoffice/document-editor-angular`). `lodash` is whitelisted there as an
  `allowedNonPeerDependencies` since ng-packagr otherwise requires all deps to be peer deps.
- `src/public-api.ts` is the sole public export surface: `DocumentEditorModule` and
  `DocumentEditorComponent`. Anything not exported here is not part of the library's public API.
- `src/lib/components/document-editor.component.ts` is the entire component implementation. Key
  behavior to understand before editing it:
  - It is a **non-standalone** component (`standalone: false`) declared/exported via
    `DocumentEditorModule`, matching the pre-v17 NgModule-based consumption pattern documented in the
    library README (standalone consumers just import `DocumentEditorModule` directly).
  - On `ngOnInit` it lazily injects the Document Server API script
    (`{documentServerUrl}/web-apps/apps/api/documents/api.js`, optionally with a `shardkey` query
    param) via `loadScript` and then calls `onLoad()`, which constructs the `window.DocsAPI.DocEditor`
    instance and stores it on the global `window.DocEditor.instances` map keyed by the component's `id`.
  - `ngOnChanges` watches a fixed list of "important" inputs (`config`, `document_fileType`,
    `document_title`, `documentType`, `editorConfig_lang`, `height`, `type`, `width`); if any of these
    change after the first change detection pass, it destroys the existing editor instance from
    `window.DocEditor.instances` and reloads a fresh one. Adding a new input that should trigger a
    reload means adding it to this list.
  - Flattened `@Input()`s prefixed `document_*`/`editorConfig_*`/`events_*` are merged into the
    `config` object passed to `DocsAPI.DocEditor` (`getDocument()`, `getEditorConfig()`, and the
    `events` block in `onLoad()`) — they exist as ergonomic per-field bindings but are ultimately
    equivalent to setting the corresponding path inside `config`. `config` is deep-cloned (`lodash`
    `cloneDeep`) before merging so the caller's object isn't mutated.
  - Errors are surfaced through `onLoadComponentError?(errorCode, errorDescription)` rather than thrown;
    error codes are `-1` (unknown), `-2` (failed to load `DocsAPI` script), `-3` (`DocsAPI` not defined
    after load).
  - `DocsAPI`/`DocEditor` types come from the separate `@onlyoffice/doceditor-types` package and are
    declared as ambient `Window` extensions at the top of the component file.
- `src/lib/utils/loadScript.ts` handles script-tag injection and de-duplication: if a script tag with
  the same `id` already exists (e.g., from a previous editor instance on the page), it polls a
  `loading` attribute on that tag rather than injecting a duplicate `<script>`.
- Versioning is coupled to Angular's major version — see the compatibility table in
  `projects/onlyoffice/document-editor-angular/README.md` (this repo currently tracks Angular 20 /
  library v7.x). Keep `CHANGELOG.md` in that project directory current: both the `create-tag.yml` and
  `release.yml` GitHub Actions workflows parse the first version heading out of that file
  (`grep -Eo '[0-9]+(\.[0-9]+)+' CHANGELOG.md | head -n 1`) to tag and publish releases, and
  `release.yml` extracts the top changelog section as release notes. Pushing to `master` (excluding
  changes limited to `.github/**`, `AUTHORS.md`, `LICENSE`, `README.md`) auto-tags a release, so bump
  the changelog/version deliberately together with any release-worthy change.
