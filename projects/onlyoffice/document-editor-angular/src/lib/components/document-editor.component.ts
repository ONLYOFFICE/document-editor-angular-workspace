import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { IConfig } from '../model/config';
import loadScript from "../utils/loadScript";

declare global {
  interface Window {
      DocsAPI?: any;
      DocEditor?: any;
  }
}

@Component({
  selector: 'document-editor',
  template: '<div [id]="id"></div>',
  styles: [
  ]
})
export class DocumentEditorComponent implements OnInit, OnChanges, OnDestroy {
  @Input() id: string;
  @Input() documentServerUrl: string;
  @Input() config: IConfig;

  @Input() document_fileType?: string;
  @Input() document_title?: string;
  @Input() documentType?: string;
  @Input() editorConfig_lang?: string;
  @Input() height?: string;
  @Input() type?: string;
  @Input() width?: string;

  @Input() events_onAppReady?: (editor: object) => void;
  @Input() events_onDocumentReady?: (editor: object) => void;
  @Input() events_onDocumentStateChange?: (data: object) => void;
  @Input() events_onError?: (error: string) => void;

  isFirstOnChanges: boolean = true;

  constructor() { }

  ngOnInit(): void {
    let url = this.documentServerUrl;
    if (!url.endsWith("/")) url += "/";

    const docApiUrl = `${url}web-apps/apps/api/documents/api.js`;
    loadScript(docApiUrl, "onlyoffice-api-script")
      .then(() => this.onLoad())
      .catch((err) => console.error(err));
  }

  ngOnChanges(changes: SimpleChanges) {
    const listNameCanges = ["config", "document_fileType", "document_title", "documentType", "editorConfig_lang", "height", "type", "width"];

    if (this.isFirstOnChanges) {
      this.isFirstOnChanges = false;
      return;
    }

    for (const name of listNameCanges) {
      if (changes.hasOwnProperty(name)) {
        if (window?.DocEditor?.instances[this.id]) {
          window.DocEditor.instances[this.id].destroyEditor();
          window.DocEditor.instances[this.id] = undefined;
    
          console.log("Important props have been changed. Load new Editor.");
          this.onLoad();
          return;
        }
      }
    }
  }

  ngOnDestroy() {
    if (window?.DocEditor?.instances[this.id]) {
      window.DocEditor.instances[this.id].destroyEditor();
      window.DocEditor.instances[this.id] = undefined;
    }
  }

  onLoad = () => {
    try {
      if (!window.DocsAPI) throw new Error("DocsAPI is not defined");
      if (window?.DocEditor?.instances[this.id]) {
        console.log("Skip loading. Instance already exists", this.id);
        return;
      }

      if (!window?.DocEditor?.instances) {
        window.DocEditor = { instances: {} };
      }

      let initConfig = Object.assign({
        document: {
          fileType: this.document_fileType,
          title: this.document_title,
        },
        documentType: this.documentType,
        editorConfig: {
          lang: this.editorConfig_lang,
        },
        events: {
          onAppReady: this.events_onAppReady,
          onDocumentReady: this.events_onDocumentReady,
          onDocumentStateChange: this.events_onDocumentStateChange,
          onError: this.events_onError,
        },
        height: this.height,
        type: this.type,
        width: this.width,
      }, this.config || {});

      const editor = window.DocsAPI.DocEditor(this.id, initConfig);
      window.DocEditor.instances[this.id] = editor;
    } catch (err: any) {
      console.error(err);
      this.events_onError!(err);
    }
};
}
