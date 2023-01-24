# @onlyoffice/document-editor-angular

This repo contains the Angular component for [ONLYOFFICE Document Server](https://github.com/ONLYOFFICE/DocumentServer).

## Installation
Install it from **npm** in your project. Run:

```bash
npm install --save @onlyoffice/document-editor-angular
```
or:
```bash
yarn add @onlyoffice/document-editor-angular
```

## Usage

### Import the DocumentEditorModule:
```
import { NgModule } from '@angular/core';
import { DocumentEditorModule } from "@onlyoffice/document-editor-angular";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    DocumentEditorAngularModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

###  Define options in your consuming component:
```js
@Component({...})
export class ExampleComponent {
  config: IConfig = {
    document: {
      "fileType": "docx",
      "key": "Khirz6zTPdfd7",
      "title": "Example Document Title.docx",
      "url": "https://example.com/url-to-example-document.docx"
    },
    documentType: "word",
    editorConfig: {
      "callbackUrl": "https://example.com/url-to-callback.ashx"
    },
  }

  onDocumentReady = (event) => {
    console.log("Document is loaded");
  };

  onLoadComponentError = (errorCode, errorDescription) => {
    switch(errorCode) {
      case -1: // Unknown error loading component
          console.log(errorDescription);
          break;

      case -2: // Error load DocsAPI from http://documentserver/
        console.log(errorDescription);
        break;

      case -3: // DocsAPI is not defined
        console.log(errorDescription);
        break;
    }
  };
}
```
### In template, use the `document-editor` component with your options:
```
<document-editor 
  id="docxForComments" 
  documentServerUrl="http://documentserver/"
  [config]="config"
  [events_onDocumentReady]="onDocumentReady"
  [onLoadComponentError]="onLoadComponentError"
></document-editor>
```

## API
### Props
| Name | Type | Default | Required | Description |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| `id` | string | null | yes | Component unique identifier. |
| `documentServerUrl` | string | null | yes | Address ONLYOFFICE Document Server. |
| `config` | object | null | yes | Generic configuration object for opening a file with token. [Config API](https://api.onlyoffice.com/editors/config/) |
| `onLoadComponentError` | (errorCode: number, errorDescription: string) => void | null | no | The function called when an error occurs while loading a component |
| `document_fileType` | string | null | no | The type of the file. |
| `document_title` | string | null | no | The file name. |
| `documentType` | string | null | no | The document type. |
| `height` | string | null | no | Defines the document height in the browser window. |
| `type` | string | null | no | Defines the platform type used to access the document (desktop, mobile or embedded). |
| `width` | string | null | no | Defines the document width in the browser window. |
| `events_onAppReady` | (event: object) => void | null | no | The function called when the application is loaded into the browser. |
| `events_onDocumentStateChange` | (event: object) => void | null | no | The function called when the document is modified. |
| `events_onMetaChange` | (event: object) => void | null | no | The function called when the meta information of the document is changed via the meta command. |
| `events_onDocumentReady` | (event: object) => void | null | no | The function called when the document is loaded into the document editor. |
| `events_onInfo` | (event: object) => void | null | no | The function called when the application opened the file. |
| `events_onWarning`| (event: object) => void | null | no | The function called when a warning occurs. |
| `events_onError` | (event: object) => void | null | no | The function called when an error or some other specific event occurs. |
| `events_onRequestSharingSettings` | (event: object) => void | null | no | The function called when the user is trying to manage document access rights by clicking _Change access rights_ button. |
| `events_onRequestRename` | (event: object) => void | null | no | The function called when the user is trying to rename the file by clicking the _Rename..._ button. |
| `events_onMakeActionLink` | (event: object) => void | null | no | The function called when the user is trying to get link for opening the document which contains a bookmark, scrolling to the bookmark position. |
| `events_onRequestInsertImage` | (event: object) => void | null | no | The function called when the user is trying to insert an image by clicking the _Image from Storage_ button. |
| `events_onRequestSaveAs` | (event: object) => void | null | no | The function called when the user is trying to save file by clicking _Save Copy as..._ button. |
| `events_onRequestMailMergeRecipients` | (event: object) => void | null | no | the function called when the user is trying to select recipients data by clicking the _Mail merge_ button. |
| `events_onRequestCompareFile` | (event: object) => void | null | no | The function called when the user is trying to select document for comparing by clicking the _Document from Storage_ button. |
| `events_onRequestEditRights` | (event: object) => void | null | no | The function called when the user is trying to switch the document from the viewing into the editing mode by clicking the _Edit Document_ button. |
| `events_onRequestHistory` | (event: object) => void | null | no | The function called when the user is trying to show the document version history by clicking the _Version History_ button. |
| `events_onRequestHistoryClose` | (event: object) => void | null | no | The function called when the user is trying to go back to the document from viewing the document version history by clicking the _Close History_ button. |
| `events_onRequestHistoryData` | (event: object) => void | null | no | The function called when the user is trying to click the specific document version in the document version history. |
| `events_onRequestRestore` | (event: object) => void | null | no | The function called when the user is trying to restore the file version by clicking the _Restore_ button in the version history. |

## Development

### Clone project from the GitHub repository:
```
git clone https://github.com/ONLYOFFICE/document-editor-angular-workspace.git
```
### Install the project dependencies:
```
npm install
```
### Build the project:
```
cd ./projects

ng build @onlyoffice/document-editor-angular
```
### Create the package:
```
cd ./dist/onlyoffice/document-editor-angular

npm pack
```
### Test the component:
```
cd ./projects

ng test @onlyoffice/document-editor-angular
```

## Feedback and support

In case you have any issues, questions, or suggestions for the ONLYOFFICE Document Server Angular component, please refer to the [Issues](https://github.com/ONLYOFFICE/document-editor-angular-workspace/issues) section.

Official project website: [www.onlyoffice.com](https://www.onlyoffice.com/).

Support forum: [forum.onlyoffice.com](https://forum.onlyoffice.com/).
