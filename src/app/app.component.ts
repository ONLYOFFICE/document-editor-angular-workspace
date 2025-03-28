import { Component } from '@angular/core';
import { DocumentEditorModule, IConfig } from '@onlyoffice/document-editor-angular';
import config from "./../../config/config.json";
import { CommentsComponent } from './components/comments/comments.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [ DocumentEditorModule, CommentsComponent ]
})
export class AppComponent {
  comments: any[] = [];
  connector: any = null;

  onDocumentReady = () => {
    var editor = window.DocEditor.instances["docxForComments"];
    this.connector = editor.createConnector();
    this.connector.executeMethod("GetAllComments", null, function(data: any) {
      let commentsRevers: any[] = [];
      for (var i = 0; i < data.length; i++){
        commentsRevers[i] = data[(data.length - 1) - i];
      }
      this.comments = commentsRevers;
    }.bind(this));
  };

  config: IConfig = {
    document: {
        fileType: "docx",
        title: "demo.docx",
        url: config.demoStorage + "demo.docx",
        key: "712027760_embedded"
    },
    documentType: "word",
    editorConfig: {
      mode: "edit",
      user: {
        id: "uid-1",
        name: "John Smith",
        },
      },
    height:"600px",
    width:"70%"
  }
}
