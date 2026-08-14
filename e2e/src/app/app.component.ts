import { Component } from '@angular/core';
import { Config } from '@onlyoffice/doceditor-types';
import { DocumentEditorModule } from '@onlyoffice/document-editor-angular';

declare global {
  interface Window {
    __e2eEvents__?: string[];
    __e2eErrors__?: Array<{ errorCode: number; errorDescription: string }>;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DocumentEditorModule],
  template: `
    <document-editor
      id="e2e-editor"
      documentServerUrl="http://e2e-document-server.test/"
      [config]="config"
      [onLoadComponentError]="onLoadComponentError"
    ></document-editor>
  `,
})
export class AppComponent {
  config: Config = {
    document: {
      fileType: 'docx',
      key: 'e2e-test-key',
      title: 'e2e-test-document.docx',
      url: 'http://e2e-document-server.test/e2e-test-document.docx',
    },
    documentType: 'word',
    editorConfig: {
      callbackUrl: 'http://e2e-document-server.test/callback',
    },
    events: {
      onAppReady: () => {
        (window.__e2eEvents__ ??= []).push('appReady');
      },
    },
  };

  onLoadComponentError = (errorCode: number, errorDescription: string) => {
    (window.__e2eErrors__ ??= []).push({ errorCode, errorDescription });
  };
}
