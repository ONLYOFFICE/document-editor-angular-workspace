import { Component, Input } from '@angular/core';
import { Config } from '@onlyoffice/doceditor-types';
import { DocumentEditorModule } from '@onlyoffice/document-editor-angular';
import { CommentsComponent } from '../comments.component';

@Component({
  selector: 'comments-stories',
  templateUrl: './comments-stories.component.html',
  imports: [ DocumentEditorModule, CommentsComponent ]
})
export class CommenstStoriesComponent {
  @Input() editorId: string;
  @Input() userName: string;
  @Input() documentServerUrl: string;
  @Input() config: Config;

  comments: any[] = [];
  connector: any = null;

  onDocumentReady = () => {
    var editor = window.DocEditor?.instances["docxForComments"];
    if (!editor) return;

    this.connector = editor.createConnector();
    this.connector.executeMethod("GetAllComments", null, function(data: any) {
      let commentsRevers: any[] = [];
      for (var i = 0; i < data.length; i++){
        commentsRevers[i] = data[(data.length - 1) - i];
      }
      this.comments = commentsRevers;
    }.bind(this));
  };
}
