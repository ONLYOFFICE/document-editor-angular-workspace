import { Component } from '@angular/core';
import { IConfig } from '@onlyoffice/document-editor-angular';
import config from "./../../config/config.json";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  comments: any[] = [];
  connector = null;

  onDocumentReady = () => {
    console.log("SDfdsafdsf");
    var editor = window.DocEditor.instances["docxForComments"];
    var connector = editor.createConnector();
    console.log("SDfdsafdsf");
    connector.executeMethod("GetAllComments", null, function(data: any) {
      let commentsRevers: any[] = [];
      for (var i = 0; i < data.length; i++){
        commentsRevers[i] = data[(data.length - 1) - i];
      }
      this.comments = commentsRevers;
    }.bind(this));

    this.connector = connector;
  };

  config: IConfig = {
    document: {
        fileType: "docx",
        title: "demo.docx",
        url: "http://192.168.0.169:8090/plugins/servlet/onlyoffice/file-provider?vkey=NGQ2MjJkYjY4M2U2NmFhODg2YzFhZDU1OGYyYjA3NzRhN2U5MDcyNjJmMGZmMDUzNmMxNWU3NDFlMjc1Mjk3Zj8zMjQ0MDM0",
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
