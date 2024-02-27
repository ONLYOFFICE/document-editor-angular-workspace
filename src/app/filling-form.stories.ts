import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { DocumentEditorComponent } from '@onlyoffice/document-editor-angular';
import config from "./../../config/config.json";
import persons from "./data/persons.json";

import { ContentControlsStoriesComponent } from './components/content-controls/content-controls-stories/content-controls-stories.component'
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentControlsComponent } from './components/content-controls/content-controls.component';
import { InputContentControlComponent } from './components/content-controls/input-content-control/input-content-control.component';
import { RadioContentControlComponent } from './components/content-controls/radio-content-control/radio-content-control.component';

function getPersonsOptions(){
  let personsOptions = [];
  for(let i = 0; i < persons.length; i++) {
    personsOptions[i] = {
      label: persons[i].FirstName +" "+ persons[i].LastName,
      value: persons[i]
    }
  }

  return personsOptions;
}

export default {
  title: 'Samples/Work with forms',
  component: ContentControlsStoriesComponent,
  parameters: {
    docs: false,
  },
  decorators: [
    moduleMetadata({
      declarations: [ DocumentEditorComponent, ContentControlsComponent, InputContentControlComponent, RadioContentControlComponent ],
      imports: [ NgSelectModule, CommonModule, FormsModule, ReactiveFormsModule ]
    }),
  ],
} as Meta;

const Template: Story<any> = (args) => ({
  props: args
});

export const ContentControlsTemplate = Template.bind({});
ContentControlsTemplate.storyName = "Work with forms";
ContentControlsTemplate.args = {
  editorId: "pdfEditor",
  documentServerUrl: config.documentserverUrl,
  config: {
    document: {
      fileType: "pdf",
      key: "pdf" + Math.random(),
      title: "withtags.pdf",
      url: config.demoStorage + "withtags.pdf",
    },
    documentType: "word",
    height:"600px",
    width:"70%"
  },
  persons: getPersonsOptions()
}