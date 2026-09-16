import { Component, computed, signal } from '@angular/core';
import { Config } from '@onlyoffice/doceditor-types';
import { DocumentEditorModule } from '@onlyoffice/document-editor-angular';

declare global {
  interface Window {
    __e2eEvents__?: string[];
    __e2eErrors__?: Array<{ errorCode: number; errorDescription: string }>;
  }
}

export const changedDocumentKey = 'e2e-changed-key';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DocumentEditorModule],
  template: `
    <button data-testid="toggle-editor" (click)="mounted.set(!mounted())">
      {{ mounted() ? 'unmount' : 'mount' }}
    </button>
    <button data-testid="change-key" (click)="documentKey.set(changedDocumentKey)">
      change key
    </button>
    @if (mounted()) {
      <document-editor
        id="e2e-editor"
        documentServerUrl="http://e2e-document-server.test/"
        [config]="config()"
        [onLoadComponentError]="onLoadComponentError"
      ></document-editor>
    }
  `,
})
export class AppComponent {
  readonly changedDocumentKey = changedDocumentKey;

  mounted = signal(true);
  documentKey = signal('e2e-test-key');

  config = computed<Config>(() => ({
    document: {
      fileType: 'docx',
      key: this.documentKey(),
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
  }));

  onLoadComponentError = (errorCode: number, errorDescription: string) => {
    (window.__e2eErrors__ ??= []).push({ errorCode, errorDescription });
  };
}
