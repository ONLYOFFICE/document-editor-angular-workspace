# ONLYOFFICE Document Editor Angular Workspace

This repository is the Angular CLI workspace that hosts the source code of
[`@onlyoffice/document-editor-angular`](https://www.npmjs.com/package/@onlyoffice/document-editor-angular) —
an Angular component for embedding [ONLYOFFICE Document Server](https://github.com/ONLYOFFICE/DocumentServer)
into Angular applications.

**Please note**: Before working with the component, you need to have ONLYOFFICE Docs installed. You can use
[Docker](https://github.com/onlyoffice/Docker-DocumentServer) (recommended) to deploy it.

## Repository structure

```
.
├── projects/
│   └── onlyoffice/
│       └── document-editor-angular/   # the @onlyoffice/document-editor-angular library
│           ├── src/                   # component sources
│           ├── README.md              # installation guide, usage examples and API reference
│           └── CHANGELOG.md           # version history
├── angular.json                       # Angular CLI workspace configuration
└── package.json                       # workspace dependencies and scripts
```

For installation instructions, usage examples, and the full API reference, see the
[library README](projects/onlyoffice/document-editor-angular/README.md).

## Development

### Prerequisites

- [Node.js (and npm)](https://nodejs.org/en)
- [Angular CLI](https://angular.io/cli)

### Install dependencies

```
npm install
```

### Build the library

```
ng build @onlyoffice/document-editor-angular
```

The build output is placed in `dist/onlyoffice/document-editor-angular`.

### Run the tests

```
ng test @onlyoffice/document-editor-angular
```

### Pack the library

```
cd dist/onlyoffice/document-editor-angular
npm pack
```

## Feedback and support

If you have any issues, questions, or suggestions regarding the ONLYOFFICE Document Server Angular component,
please refer to the [Issues](https://github.com/ONLYOFFICE/document-editor-angular-workspace/issues) section.

Official project website: [www.onlyoffice.com](https://www.onlyoffice.com/).

Support forum: [forum.onlyoffice.com](https://forum.onlyoffice.com/).

## License

The source code is licensed under the [Apache-2.0](LICENSE) license.
