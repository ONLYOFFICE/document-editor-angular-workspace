import { Component } from '@angular/core';
import { IConfig } from '@onlyoffice/document-editor-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  config: IConfig = {
    document: {
        fileType: "docx",
        title: "demo.docx",
        url: "https://d2nlctn12v279m.cloudfront.net/assets/docs/samples/demo.docx",
        key: "Khirz6zTPdfd7"
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
