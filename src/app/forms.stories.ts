import { moduleMetadata, StoryFn, Meta } from '@storybook/angular';
import { DocumentEditorComponent } from '@onlyoffice/document-editor-angular';
import config from "../../config/config.json";

import { FormsStoriesComponent } from './components/forms/forms-stories/forms-stories.component';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export default {
  title: 'Samples/Form templates',
  component: FormsStoriesComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      declarations: [
        DocumentEditorComponent
      ],
      imports: [
        HttpClientModule, NgSelectModule, CommonModule, FormsModule, ReactiveFormsModule
      ]
    }),
  ],
} as Meta;

const Template: StoryFn<any> = (args) => ({
  props: args
});

export const FomsTemplate = Template.bind({});
FomsTemplate.storyName = "Form templates";
FomsTemplate.args = {
  editorId: "pdfEditor",
  documentServerUrl: config.documentserverUrl,
  config:{
    document: {
        fileType: "pdf",
        key: "pdf" + Math.random(),
        title: "oform.pdf",
        url: config.demoStorage + "oform.pdf",
    },
    documentType: "word",
    height:"600px",
  },
};