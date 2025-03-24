import { StoryFn, Meta } from '@storybook/angular';
import config from "./../../config/config.json";

import { CommenstStoriesComponent } from './components/comments/comments-stories/commenst-stories.component';

export default {
  title: 'Samples/Work with comments',
  component: CommenstStoriesComponent,
  tags: ['autodocs']
} as Meta;

const Template: StoryFn<any> = (args) => ({
  props: args
});

export const CommentsTemplate = Template.bind({});
CommentsTemplate.storyName = "Work with comments";
CommentsTemplate.args = {
  editorId: "docxForComments",
  userName: "John Smith",
  documentServerUrl: config.documentserverUrl,
  config: {
    document: {
      fileType: "docx",
      key: "docx" + Math.random(),
      title: "demo.docx",
      url: config.demoStorage + "withcomments.docx",
    },
    documentType: "word",
    editorConfig: {
      mode: "edit",
      user: {
          name: "John Smith" ,
      },
    },
    height:"600px",
    width:"70%"
  }
};