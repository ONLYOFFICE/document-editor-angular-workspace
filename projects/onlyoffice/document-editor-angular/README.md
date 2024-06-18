# @onlyoffice/document-editor-angular

This repo contains the ONLYOFFICE Docs Angular component which integrates [ONLYOFFICE Document Server](https://github.com/ONLYOFFICE/DocumentServer) into [Angular](https://angularjs.org/) projects.

**Please note**: Before working with this component, you need to install ONLYOFFICE Docs. To do so, you can use [Docker](https://github.com/onlyoffice/Docker-DocumentServer) (recommended).

## Versions

| Angular          | document-editor-angular |
|------------------|:-----------------------:|
| >=17.0.0 <18.0.0 |           v4.x          |
| >=16.0.0 <17.0.0 |           v3.x          |
| >=15.0.0 <16.0.0 |           v2.x          |

---

## Prerequisites

This procedure requires [Node.js (and npm)](https://nodejs.org/en).

## Creating the demo Angular application with ONLYOFFICE Docs editor
This procedure creates a [basic Angular application](https://angular.io/guide/setup-local) and installs an ONLYOFFICE Docs editor in it.
1. Open a command line or command prompt and install the [Angular CLI Tool](https://angular.io/cli) package:
```
npm install -g @angular/cli
```

2. Create a new Angular project named *onlyoffice-angular-demo*:
```
ng new --defaults --skip-git onlyoffice-angular-demo
```

3. Go to the newly created directory:
```
cd onlyoffice-angular-demo
```

4. Install ONLYOFFICE Docs Angular component from **npm** and save it to the *package.json* file with *--save*:
```
npm install --save @onlyoffice/document-editor-angular
```

You can also use the following **yarn** command:
```
yarn add @onlyoffice/document-editor-angular
```

The following steps depend on the Angular version you use. To check the installed version, run the following command:
```
ng version
```

#### Versions prior to 17.0.0
1. Open the *./src/app/app.module.ts* file in the *onlyoffice-angular-demo* project and import the **DocumentEditorModule**:
```
import { NgModule } from "@angular/core";
import { DocumentEditorModule } from "@onlyoffice/document-editor-angular";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        DocumentEditorModule,
        BrowserModule
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
```

2. Open the *./src/app/app.component.ts* file in the *onlyoffice-angular-demo* project and define options in your consuming component:
```
import { Component } from "@angular/core";
import { IConfig } from "@onlyoffice/document-editor-angular";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html"
})
export class AppComponent {
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

    onDocumentReady = () => {
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
    }
}
```
Replace the following lines with your own data:
* **"https://example.com/url-to-example-document.docx"** - replace with the URL to your file;
* **"https://example.com/url-to-callback.ashx"** - replace with your callback URL (this is required for the saving functionality to work).

This TypeScript file will create the *AppComponent* component containing the ONLYOFFICE Docs editor configured with basic features.

3. In template, use the *document-editor* component with your options:
```
<document-editor
    id="docxEditor"
    documentServerUrl="http://documentserver/"
    [config]="config"
    [events_onDocumentReady]="onDocumentReady"
    [onLoadComponentError]="onLoadComponentError"
></document-editor>
```
Replace the **"http://documentserver/"** line with the URL of your server.

#### Versions 17.0.0 and above
1. Open the *./src/app/app.component.ts* file in the *onlyoffice-angular-demo* project and define options in your consuming component:

**Please note**: Starting from Angular v17.0.0, the *app.module.ts* file is not added to the new projects by default. You must specify *DocumentEditorModule* in the *imports* property of the *Component* decorator and set *standalone* to *true*.

```
import { Component } from "@angular/core";
import { IConfig } from "@onlyoffice/document-editor-angular";
import { DocumentEditorModule } from "@onlyoffice/document-editor-angular";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [DocumentEditorModule],
    templateUrl: "./app.component.html"
})
export class AppComponent {
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

    onDocumentReady = () => {
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
    }
}
```
Replace the following lines with your own data:
* **"https://example.com/url-to-example-document.docx"** - replace with the URL to your file;
* **"https://example.com/url-to-callback.ashx"** - replace with your callback URL (this is required for the saving functionality to work).

This TypeScript file will create the *AppComponent* component containing the ONLYOFFICE Docs editor configured with basic features.

2. In template, use the *document-editor* component with your options:
```
<document-editor
    id="docxEditor"
    documentServerUrl="http://documentserver/"
    [config]="config"
    [events_onDocumentReady]="onDocumentReady"
    [onLoadComponentError]="onLoadComponentError"
></document-editor>
```
Replace the **"http://documentserver/"** line with the URL of your server.

Test the application using the Node.js development server:
* To start the development server, navigate to the *onlyoffice-angular-demo* directory and run:
```
npm run start
```
* To stop the development server, select on the command line or command prompt and press *Ctrl+C*.

## Deploying the demo Angular application
To deploy the application to a production environment, create the build-specific configuration options for Angular projects:
1. Create the *src/environments/* directory and configure the project to use these files by running the following command:
```
ng generate environments
```
The newly created directory contains the *environment.ts* base configuration file, which provides configuration for the default *production* environment. The default values can be overridden for the additional environments, such as *development* and *staging*, in target-specific configuration files.

The base *environment.ts* file contains the default environment settings:
```
export const environment = {
    production: false
}
```
The *build* command uses this as the build target when no environment is specified.
You can add additional properties to the *environment* object, or as separate objects. For example, the default *apiUrl* variable is added to the default environment:
```
export const environment = {
    production: true,
    apiUrl: "http://my-prod-url"
};
````

2. Import the original environment file in the *app.component.ts* component file to use the environment configurations you have defined:
```
import { environment } from "./../environments/environment";
```
This ensures that the *build* and *serve* commands can find the configurations for the specific build targets.

3. Add the *fileReplacements* parameter to the configuration for each build target of the *angular.json* configuration file. This parameter replaces any file in the TypeScript program with the target-specific file version and includes the target-specific code or variables in a build that targets a specific environment, such as *development* or *staging*.

By default no files are replaced. But you can add file replacements for the specific build targets:

```
"configurations": {
    "development": {
        "fileReplacements": [
            {
                "replace": "src/environments/environment.ts",
                "with": "src/environments/environment.development.ts"
            }
        ],
        ...
    }
}
```

This means that when you build your development configuration with *ng build --configuration development*, the *src/environments/environment.ts* file is replaced with the *src/environments/environment.development.ts* target-specific version of the file.

You can add additional configurations. For example, to add a *staging* environment, copy the *src/environments/environment.ts* file with the *src/environments/environment.staging.ts* title, then add a *staging* configuration to *angular.json*:

```
"configurations": {
    "production": { ... },
    "staging": {
        "fileReplacements": [
            {
                "replace": "src/environments/environment.ts",
                "with": "src/environments/environment.staging.ts"
            }
        ]
    }
}
```

4. Configure the *serve* command to use the targeted build configuration by adding it to the *serve.configurations* section of *angular.json*:

```
"serve": {
    "builder": "@angular-devkit/build-angular:dev-server",
    "configurations": {
        "production": {
            "browserTarget": "document-editor-angular-workspace:build:production"
        },
        "development": {
            "browserTarget": "document-editor-angular-workspace:build:development"
        }
    }
}
```

Now you can deploy the application to the created server:
1. Navigate to the *onlyoffice-angular-demo* directory and run:
```
ng build
```
The *dist* directory will be created with a production build of your app.

2. Copy the contents of the *dist/onlyoffice-angular-demo* directory to the root directory of the web server (to the *onlyoffice-angular-demo* folder).

The application will be deployed on the web server (*http://localhost:3000* by default).


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
| `events_onRequestMailMergeRecipients` [DEPRECATED] | (event: object) => void | null | no | the function called when the user is trying to select recipients data by clicking the _Mail merge_ button. |
| `events_onRequestCompareFile` [DEPRECATED] | (event: object) => void | null | no | The function called when the user is trying to select document for comparing by clicking the _Document from Storage_ button. |
| `events_onRequestEditRights` | (event: object) => void | null | no | The function called when the user is trying to switch the document from the viewing into the editing mode by clicking the _Edit Document_ button. |
| `events_onRequestHistory` | (event: object) => void | null | no | The function called when the user is trying to show the document version history by clicking the _Version History_ button. |
| `events_onRequestHistoryClose` | (event: object) => void | null | no | The function called when the user is trying to go back to the document from viewing the document version history by clicking the _Close History_ button. |
| `events_onRequestHistoryData` | (event: object) => void | null | no | The function called when the user is trying to click the specific document version in the document version history. |
| `events_onRequestRestore` | (event: object) => void | null | no | The function called when the user is trying to restore the file version by clicking the _Restore_ button in the version history. |
| `events_onRequestSelectSpreadsheet` | (event: object) => void | null | no | The function called when the user is trying to select recipients data by clicking the Mail merge button. |
| `events_onRequestSelectDocument` | (event: object) => void | null | no | The function called when the user is trying to select a document for comparing or combining. |
| `events_onRequestUsers` | (event: object) => void | null | no | The function called when  the user can select other users to mention in the comments, grant the access rights to edit the specific sheet ranges, or set the user avatars. |

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
