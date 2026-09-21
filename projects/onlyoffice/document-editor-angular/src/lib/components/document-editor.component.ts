/*
* (c) Copyright Ascensio System SIA 2026
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import { Component, ElementRef, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Config, DocEditor } from '@onlyoffice/doceditor-types';
import loadScript from "../utils/loadScript";
import { cloneDeep } from 'lodash';

declare global {
  interface Window {
      DocsAPI?: {
        DocEditor: (id: string, config: Config) => DocEditor;
      };
      DocEditor?: {
        instances: Record<string, DocEditor | undefined>;
      };
  }
}

@Component({
  selector: 'document-editor',
  template: '<div [id]="id"></div>',
  styles: [
    ':host { display: contents; }'
  ],
  standalone: false
})
export class DocumentEditorComponent implements OnInit, OnChanges, OnDestroy {
  @Input() id: string;
  @Input() documentServerUrl: string;
  @Input() shardkey: string | boolean = true;
  @Input() config: Config;

  /**
   * @deprecated Use `config.document.fileType` instead.
   */
  @Input() document_fileType?: string;
  /**
   * @deprecated Use `config.document.title` instead.
   */
  @Input() document_title?: string;
  /**
   * @deprecated Use `config.documentType` instead.
   */
  @Input() documentType?: string;
  /**
   * @deprecated Use `config.editorConfig.lang` instead.
   */
  @Input() editorConfig_lang?: string;
  /**
   * @deprecated Use `config.height` instead.
   */
  @Input() height?: string;
  /**
   * @deprecated Use `config.type` instead.
   */
  @Input() type?: string;
  /**
   * @deprecated Use `config.width` instead.
   */
  @Input() width?: string;

  @Input() onLoadComponentError?: (errorCode: number, errorDescription: string) => void;

  /**
   * @deprecated Use `config.events.onAppReady` instead.
   */
  @Input() events_onAppReady?: (event: object) => void;
  /**
   * @deprecated Use `config.events.onDocumentStateChange` instead.
   */
  @Input() events_onDocumentStateChange?: (event: object) => void;
  /**
   * @deprecated Use `config.events.onMetaChange` instead.
   */
  @Input() events_onMetaChange?: (event: object) => void;
  /**
   * @deprecated Use `config.events.onDocumentReady` instead.
   */
  @Input() events_onDocumentReady?: (event: object) => void;
  /**
   * @deprecated Use `config.events.onInfo` instead.
   */
  @Input() events_onInfo?: (event: object) => void;
  /**
   * @deprecated Use `config.events.onWarning` instead.
   */
  @Input() events_onWarning?: (event: object) => void;
  /**
   * @deprecated Use `config.events.onError` instead.
   */
  @Input() events_onError?: (event: object) => void;
  /**
   * @deprecated Use `config.events.onRequestSharingSettings` instead.
   */
  @Input() events_onRequestSharingSettings?: (event: object) => void;
  /**
   * @deprecated Use `config.events.onRequestRename` instead.
   */
  @Input() events_onRequestRename?: (event: object) => void;
  /**
   * @deprecated Use `config.events.onMakeActionLink` instead.
   */
  @Input() events_onMakeActionLink?: (event: object) => void;
  /**
   * @deprecated Use `config.events.onRequestInsertImage` instead.
   */
  @Input() events_onRequestInsertImage?: (event: object) => void;
  /**
   * @deprecated Use `config.events.onRequestSaveAs` instead.
   */
  @Input() events_onRequestSaveAs?: (event: object) => void;
  /**
   * @deprecated Deprecated since version 7.5, please use `config.events.onRequestSelectSpreadsheet` instead.
   */
  @Input() events_onRequestMailMergeRecipients?: (event: object) => void;
  /**
   * @deprecated Deprecated since version 7.5, please use `config.events.onRequestSelectDocument` instead.
   */
  @Input() events_onRequestCompareFile?: (event: object) => void;
  /**
   * @deprecated Use `config.events.onRequestEditRights` instead.
   */
  @Input() events_onRequestEditRights?: (event: object) => void;
  /**
   * @deprecated Use `config.events.onRequestHistory` instead.
   */
  @Input() events_onRequestHistory?: (event: object) => void;
  /**
   * @deprecated Use `config.events.onRequestHistoryClose` instead.
   */
  @Input() events_onRequestHistoryClose?: (event: object) => void;
  /**
   * @deprecated Use `config.events.onRequestHistoryData` instead.
   */
  @Input() events_onRequestHistoryData?: (event: object) => void;
  /**
   * @deprecated Use `config.events.onRequestRestore` instead.
   */
  @Input() events_onRequestRestore?: (event: object) => void;
  /**
   * @deprecated Use `config.events.onRequestSelectSpreadsheet` instead.
   */
  @Input() events_onRequestSelectSpreadsheet?: (event: object) => void;
  /**
   * @deprecated Use `config.events.onRequestSelectDocument` instead.
   */
  @Input() events_onRequestSelectDocument?: (event: object) => void;
  /**
   * @deprecated Use `config.events.onRequestUsers` instead.
   */
  @Input() events_onRequestUsers?: (event: object) => void;

  isFirstOnChanges: boolean = true;
  private isDestroyed: boolean = false;

  constructor(private elementRef: ElementRef<HTMLElement>) {
    // DocsAPI finds the placeholder with getElementById, so the id must stay on
    // the template div and off the host element Angular owns.
    this.elementRef.nativeElement.removeAttribute("id");
  }

  ngOnInit(): void {
    let url = this.documentServerUrl;
    if (!url.endsWith("/")) url += "/";

    let docsApiUrl = `${url}web-apps/apps/api/documents/api.js`;
    if (this.shardkey) {
      if (typeof this.shardkey === "boolean") {
        docsApiUrl += `?shardkey=${this.config.document?.key}`;
      } else {
        docsApiUrl += `?shardkey=${this.shardkey}`;
      }
    }

    loadScript(docsApiUrl, "onlyoffice-api-script")
      .then(() => {
        if (this.isDestroyed) return;
        this.onLoad();
      })
      .catch((err) => {
        if (this.isDestroyed) return;
        this.onError(-2);
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    const listNameChanges = ["config", "document_fileType", "document_title", "documentType", "editorConfig_lang", "height", "type", "width"];

    if (this.isFirstOnChanges) {
      this.isFirstOnChanges = false;
      return;
    }

    for (const name of listNameChanges) {
      if (changes.hasOwnProperty(name)) {
        const instances = window?.DocEditor?.instances;
        const editor = instances?.[this.id];

        if (editor) {
          editor.destroyEditor();
          instances[this.id] = undefined;
    
          console.log("Important props have been changed. Load new Editor.");
          this.onLoad();
          return;
        }
      }
    }
  }

  ngOnDestroy() {
    this.isDestroyed = true;

    const instances = window?.DocEditor?.instances;
    const editor = instances?.[this.id];

    if (editor) {
      editor.destroyEditor();
      instances[this.id] = undefined;
    }
  }

  private onLoad = () => {
    try {
      if (!window.DocsAPI) {
        this.onError(-3);
        return;
      }
      if (window?.DocEditor?.instances[this.id]) {
        console.log("Skip loading. Instance already exists", this.id);
        return;
      }

      if (!window?.DocEditor?.instances) {
        window.DocEditor = { instances: {} };
      }

      var cloneConfig = cloneDeep(this.config);

      var propsConfig: any = {
        documentType: this.documentType,
        events: {
          onAppReady: this.onAppReady,
          onDocumentStateChange: this.events_onDocumentStateChange,
          onMetaChange: this.events_onMetaChange,
          onDocumentReady: this.events_onDocumentReady,
          onInfo: this.events_onInfo,
          onWarning: this.events_onWarning,
          onError: this.events_onError,
          onRequestSharingSettings: this.events_onRequestSharingSettings,
          onRequestRename: this.events_onRequestRename,
          onMakeActionLink: this.events_onMakeActionLink,
          onRequestInsertImage: this.events_onRequestInsertImage,
          onRequestSaveAs: this.events_onRequestSaveAs,
          onRequestMailMergeRecipients: this.events_onRequestMailMergeRecipients,
          onRequestCompareFile: this.events_onRequestCompareFile,
          onRequestEditRights: this.events_onRequestEditRights,
          onRequestHistory: this.events_onRequestHistory,
          onRequestHistoryClose: this.events_onRequestHistoryClose,
          onRequestHistoryData: this.events_onRequestHistoryData,
          onRequestRestore: this.events_onRequestRestore,
          onRequestSelectSpreadsheet: this.events_onRequestSelectSpreadsheet,
          onRequestSelectDocument: this.events_onRequestSelectDocument,
          onRequestUsers: this.events_onRequestUsers
        },
        height: this.height,
        type: this.type,
        width: this.width,
      };

      const document = this.getDocument();
      const editorConfig = this.getEditorConfig();

      if (document !== null) {
        propsConfig.document = document;
      }

      if (editorConfig !== null) {
        propsConfig.editorConfig = editorConfig;
      }

      let initConfig = Object.assign(propsConfig, cloneConfig || {});

      const editor = window.DocsAPI.DocEditor(this.id, initConfig);
      window.DocEditor.instances[this.id] = editor;
    } catch (err: any) {
      console.error(err);
      this.onError(-1);
    }
  };

  private getDocument = () => {
    var document: any = null;

    if (this.document_fileType) {
      document = document || {};
      document.fileType = this.document_fileType;
    }

    if (this.document_title) {
      document = document || {};
      document.document_title = this.document_title;
    }

    return document;
  }

  private getEditorConfig = () => {
    var editorConfig: any = null;

    if (this.editorConfig_lang) {
      editorConfig = editorConfig || {};
      editorConfig.lang = this.editorConfig_lang;
    }

    return editorConfig;
  }

  private onError = (errorCode: number) => {
    let message;

    switch(errorCode) {
      case -2:
        message = "Error load DocsAPI from " + this.documentServerUrl;
        break;
      case -3:
        message = "DocsAPI is not defined";
        break;
      default:
        message = "Unknown error loading component";
        errorCode = -1;
    }

    if (typeof this.onLoadComponentError == "undefined") {
      console.error(message);
    } else {
      this.onLoadComponentError(errorCode, message);
    }
  }

  private onAppReady = () => {
    this.events_onAppReady?.(window.DocEditor?.instances[this.id] || {});
  }
}
