# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository purpose

This is the Angular CLI workspace for `@onlyoffice/document-editor-angular`, a single published
Angular library component that embeds ONLYOFFICE Document Server into Angular applications. The
Angular workspace itself contains exactly one project (the library) — there is no demo/sandbox app.
The `e2e/` directory is a **separate, nested npm project** (its own `package.json`, `angular.json`,
`node_modules`) that exists only to smoke-test the packed library; it is not part of the workspace
build and its build artifacts are git-ignored.

## Commands

The workspace holds exactly one project, so the Angular CLI resolves it automatically — no project
name and no `defaultProject` needed.

```
npm install                                          # install workspace dependencies

npm run build                                        # ng build -> dist/onlyoffice/document-editor-angular
npm test                                             # ng test, full Karma/Jasmine unit suite

cd dist/onlyoffice/document-editor-angular
npm pack                                             # publishable tarball from the build output
```

`npm test` defaults to Karma's interactive watch mode with a real Chrome. For a one-shot run
(CI, agents), pass:
```
npm test -- --watch=false --browsers=ChromeHeadless
```

Single spec file via Karma's file filter:
```
npm test -- --include='**/document-editor.component.spec.ts'
```

Passing the full scoped name explicitly (`ng build @onlyoffice/document-editor-angular`) also works
and is what the README documents.

End-to-end (Playwright, from the repo root):
```
npm run test:e2e                                     # npm ci in e2e/ + node scripts/setup.mjs + playwright test
```
Inside `e2e/` you can also run `npx playwright test tests/document-editor.e2e.spec.ts -g 'error code -2'`
for a single test, and `npm run start -- --port 4300` to serve the harness app by hand (Playwright's
`webServer` reuses an already-running dev server outside CI).

There is no lint script configured in either `package.json`.

## Architecture

### Library (`projects/onlyoffice/document-editor-angular/`)

- This is the only Angular project (`root`/`sourceRoot` in `angular.json`). Its own `package.json` is
  the manifest that actually gets published to npm (version, peerDependencies on
  `@angular/common`/`@angular/core`/`@onlyoffice/doceditor-types`, and the `lodash` runtime
  dependency) — separate from the workspace root `package.json`.
- `ng-package.json` (ng-packagr config) declares the entry point (`src/public-api.ts`) and build
  destination (`dist/onlyoffice/document-editor-angular`). `lodash` is whitelisted there as an
  `allowedNonPeerDependencies` since ng-packagr otherwise requires all deps to be peer deps.
- `src/public-api.ts` is the sole public export surface: `DocumentEditorModule` and
  `DocumentEditorComponent`. Anything not exported there is not part of the library's public API.
- The root `tsconfig.json` maps the path `@onlyoffice/document-editor-angular` to
  `./dist/onlyoffice/document-editor-angular`, so anything importing the package by name resolves to
  the **built output**, not to the sources — rebuild before relying on it.
- `src/lib/components/document-editor.component.ts` is the entire component implementation. Key
  behavior to understand before editing it:
  - It is a **non-standalone** component (`standalone: false`) declared/exported via
    `DocumentEditorModule`, matching the pre-v17 NgModule-based consumption pattern documented in the
    library README (standalone consumers just import `DocumentEditorModule` directly).
  - On `ngOnInit` it lazily injects the Document Server API script
    (`{documentServerUrl}/web-apps/apps/api/documents/api.js`, with a `shardkey` query param unless
    `shardkey` is set to `false`; `shardkey: true`, the default, uses `config.document.key`) via
    `loadScript`, then calls `onLoad()`, which constructs the `window.DocsAPI.DocEditor` instance and
    stores it on the global `window.DocEditor.instances` map keyed by the component's `id`.
  - `ngOnChanges` watches a fixed list of "important" inputs (`config`, `document_fileType`,
    `document_title`, `documentType`, `editorConfig_lang`, `height`, `type`, `width`); if any change
    after the first change detection pass, it destroys the existing instance from
    `window.DocEditor.instances` and reloads a fresh editor. Adding a new input that should trigger a
    reload means adding it to this list.
  - Flattened `@Input()`s prefixed `document_*`/`editorConfig_*`/`events_*` are merged into the
    `config` object passed to `DocsAPI.DocEditor` (`getDocument()`, `getEditorConfig()`, and the
    `events` block in `onLoad()`). The merge is a **shallow** `Object.assign(propsConfig, cloneDeep(config))`,
    so a caller-supplied `config.document` / `config.editorConfig` / `config.events` replaces the whole
    corresponding block built from the flattened inputs rather than merging field by field. `config` is
    deep-cloned (`lodash` `cloneDeep`) first so the caller's object isn't mutated. Note that
    `document_title` is currently written to `document.document_title`, not `document.title`.
  - Errors are surfaced through `onLoadComponentError?(errorCode, errorDescription)` rather than
    thrown; error codes are `-1` (unknown), `-2` (failed to load the `DocsAPI` script), `-3`
    (`DocsAPI` not defined after load).
  - `DocsAPI`/`DocEditor` types come from the separate `@onlyoffice/doceditor-types` package and are
    declared as ambient `Window` extensions at the top of the component file.
- `src/lib/utils/loadScript.ts` handles script-tag injection and de-duplication: it resolves
  immediately if `window.DocsAPI` already exists, and if a script tag with the same `id` is present
  (e.g. from a previous editor instance on the page) it polls that tag's `loading` attribute instead
  of injecting a duplicate `<script>`.
- Unit tests run **zoneless** — specs provide `provideZonelessChangeDetection()` in the TestBed; keep
  new specs consistent with that.

### E2E harness (`e2e/`)

- `scripts/setup.mjs` runs before Playwright: by default it builds the library from source, `npm pack`s
  it into `e2e/.tmp/`, and `npm install`s that tarball into `e2e/node_modules` (`--no-save`). Setting
  `E2E_LIB_VERSION=<version>` instead installs that version from npm and skips the source build — this
  is how the `E2E` workflow's `workflow_dispatch` input tests an already-published release.
- `src/app/app.component.ts` is a minimal standalone app that mounts `<document-editor>` and records
  editor events / component errors on `window.__e2eEvents__` and `window.__e2eErrors__`; the specs in
  `tests/` assert against those globals.
- No real Document Server is involved: the tests inject a fake `window.DocsAPI` either via
  `page.addInitScript` or by fulfilling the routed `**/web-apps/apps/api/documents/api.js**` request,
  and abort that route to exercise the `-2` error path.
- The dev server runs on port 4300 (`playwright.config.ts` `webServer` + `baseURL`).

## Release process

Versioning is coupled to Angular's major version — see the compatibility table in
`projects/onlyoffice/document-editor-angular/README.md` (this repo currently tracks Angular 20 /
library v7.x). Keep `CHANGELOG.md` in that project directory current: both
`.github/workflows/create-tag.yml` and `release.yml` parse the first version heading out of that file
(`grep -Eo '[0-9]+(\.[0-9]+)+' CHANGELOG.md | head -n 1`) to tag and publish releases, and
`release.yml` extracts the top changelog section as the GitHub release notes. Pushing to `master`
(excluding changes limited to `.github/**`, `AUTHORS.md`, `LICENSE`, `README.md`) auto-tags a release,
and the tag push in turn triggers the npm publish — so bump the changelog and the library
`package.json` version deliberately together with any release-worthy change. `release.yml` publishes
under the `backport` dist-tag when the built major version is lower than the current `latest` on npm.
