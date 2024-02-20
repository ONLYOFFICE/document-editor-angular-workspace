/*
* (c) Copyright Ascensio System SIA 2024
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

  @Input() onLoadComponentError?: (errorCode: number, errorDescription: string) => void;

  @Input() events_onAppReady?: (event: object) => void;
  @Input() events_onDocumentStateChange?: (event: object) => void;
  @Input() events_onMetaChange?: (event: object) => void;
  @Input() events_onDocumentReady?: (event: object) => void;
  @Input() events_onInfo?: (event: object) => void;
  @Input() events_onWarning?: (event: object) => void;
  @Input() events_onError?: (event: object) => void;
  @Input() events_onRequestSharingSettings?: (event: object) => void;
  @Input() events_onRequestRename?: (event: object) => void;
  @Input() events_onMakeActionLink?: (event: object) => void;
  @Input() events_onRequestInsertImage?: (event: object) => void;
  @Input() events_onRequestSaveAs?: (event: object) => void;
  /**
   * @deprecated Deprecated since version 7.5, please use events_onRequestSelectSpreadsheet instead.
   */
  @Input() events_onRequestMailMergeRecipients?: (event: object) => void;
  /**
   * @deprecated Deprecated since version 7.5, please use events_onRequestSelectDocument instead.
   */
  @Input() events_onRequestCompareFile?: (event: object) => void;
  @Input() events_onRequestEditRights?: (event: object) => void;
  @Input() events_onRequestHistory?: (event: object) => void;
  @Input() events_onRequestHistoryClose?: (event: object) => void;
  @Input() events_onRequestHistoryData?: (event: object) => void;
  @Input() events_onRequestRestore?: (event: object) => void;
  @Input() events_onRequestSelectSpreadsheet?: (event: object) => void;
  @Input() events_onRequestSelectDocument?: (event: object) => void;

  isFirstOnChanges: boolean = true;

  constructor() { }

  ngOnInit(): void {
    let url = this.documentServerUrl;
    if (!url.endsWith("/")) url += "/";

    const docApiUrl = `${url}web-apps/apps/api/documents/api.js`;
    loadScript(docApiUrl, "onlyoffice-api-script")
      .then(() => this.onLoad())
      .catch((err) => {
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
      if (!window.DocsAPI) this.onError(-3);
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
          onRequestSelectDocument: this.events_onRequestSelectDocument
        },
        height: this.height,
        type: this.type,
        width: this.width,
      }, this.config || {});

      const editor = window.DocsAPI.DocEditor(this.id, initConfig);
      window.DocEditor.instances[this.id] = editor;
    } catch (err: any) {
      console.error(err);
      this.onError(-1);
    }
  };

  onError = (errorCode: number) => {
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

  onAppReady() {
    this.events_onAppReady!(window.DocEditor.instances[this.id]);
  }
}
