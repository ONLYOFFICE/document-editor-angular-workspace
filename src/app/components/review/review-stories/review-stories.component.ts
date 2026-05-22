import { Component, Input } from '@angular/core';
import { Config } from '@onlyoffice/doceditor-types';
import { DocumentEditorModule } from '@onlyoffice/document-editor-angular';
import { ReviewComponent } from '../review.component';

@Component({
  selector: 'review-stories',
  templateUrl: './review-stories.component.html',
  imports: [ DocumentEditorModule, ReviewComponent ]
})
export class ReviewStoriesComponent {
  @Input() editorId: string;
  @Input() documentServerUrl: string;
  @Input() config: Config;

  comments: any[] = [];
  connector: any = null;

  onDocumentReady = () => {
    var editor = window.DocEditor?.instances[this.editorId];
    if (!editor) return;

    this.connector = editor.createConnector();
  };
}
