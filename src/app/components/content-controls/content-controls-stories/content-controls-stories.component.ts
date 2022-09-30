import { Component, Input } from '@angular/core';
import { IConfig } from '@onlyoffice/document-editor-angular';
import { IPerson } from '../../../model/person';

@Component({
  selector: 'content-controls-stories',
  templateUrl: './content-controls-stories.component.html'
})
export class ContentControlsStoriesComponent {
  @Input() editorId: string;
  @Input() documentServerUrl: string;
  @Input() config: IConfig;
  @Input() persons: IPerson[];

  connector: any = null;

  contentControls: any;
  selectedPerson: any;

  onChangeSelect = () => {
    for (var [key, value] of Object.entries<string>(this.selectedPerson)) {
      if (key == "Sex") {
        key = value == "Male" ? "Male" : "Female";
        value = "true";
      }

      this.setFormValue(key, value || "");
    }

    this.getAllContentControls();
  };

  setFormValue = (formId: string, value: string) => {
    this.connector.executeMethod("GetFormsByTag", [formId], function(forms: any) {
      this.connector.executeMethod("SetFormValue", [forms[0]["InternalId"], value], null);
    }.bind(this));
  }

  getAllContentControls = () => {
    this.connector.executeMethod ("GetAllContentControls", null, function(data: any) {
      for (let i = 0; i < data.length; i++) {
        switch (data[i].Tag) {
          case "Male":
            data[i].GroupKey = "Sex";
            data[i].Type = "radio";
            break;
          case "Female":
            data[i].GroupKey = "Sex";
            data[i].Type = "radio";
            break;
          default:
            data[i].Type = "input";
        }

        this.connector.executeMethod("GetFormValue", [data[i].InternalId], (value: any) => {
            data[i].Value = value ? value : "";
            if (data.length - 1 == i) {
              this.contentControls = data.filter((contentControl: any) => contentControl.Tag != "");
            }
        });
      }
    }.bind(this));
  }

  onChangeContentControl = (oPr: { Tag?: string; InternalId?: string }) => {
    this.getAllContentControls();
  };

  onDocumentReady = () => {
    try {
      var editor = window.DocEditor.instances["oformEditor"];
      this.connector = editor.createConnector();
      this.connector.connect();

      this.getAllContentControls();
      this.connector.attachEvent("onChangeContentControl", this.onChangeContentControl);
    } catch (err) {
      console.error(err);
    }
  };
}