import { Component, Input } from '@angular/core';
import { IConfig } from '@onlyoffice/document-editor-angular';

@Component({
  selector: 'review-stories',
  templateUrl: './review-stories.component.html'
})
export class ReviewStoriesComponent {
  @Input() editorId: string;
  @Input() documentServerUrl: string;
  @Input() config: IConfig;

  comments: any[] = [];
  connector: any = null;

  onDocumentReady = () => {
    var editor = window.DocEditor.instances[this.editorId];
    this.connector = editor.createConnector();
  };
}