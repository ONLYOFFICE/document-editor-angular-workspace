import { StoryFn, Meta } from '@storybook/angular';
import config from "./../../config/config.json";

import { ReviewStoriesComponent } from './components/review/review-stories/review-stories.component';

export default {
  title: 'Samples/Work with review',
  component: ReviewStoriesComponent,
  tags: ['autodocs']
} as Meta;

const Template: StoryFn<any> = (args) => ({
  props: args
});

export const CommentsTemplate = Template.bind({});
CommentsTemplate.storyName = "Work with review";
CommentsTemplate.args = {
  editorId: "docxForReview",
  documentServerUrl: config.documentserverUrl,
  config: {
    document: {
      fileType: "docx",
      key: "docx" + Math.random(),
      title: "demo.docx",
      url: config.demoStorage + "review.docx",
      permissions: {
        edit: false,
        review: true
      }
    },
    editorConfig: {
      mode: "edit"
    },
    documentType: "word",
    height:"600px"
  }
};