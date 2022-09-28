import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { DocumentEditorComponent } from '@onlyoffice/document-editor-angular';
import config from "./../../config/config.json";
import { CommentsComponent } from './components/comments/comments.component';

import { CommenstStoriesComponent } from './components/comments/comments-stories/commenst-stories.component';
import { AddCommentComponent } from './components/comments/add-comment/add-comment.component';
import { AddCommentReplyComponent } from './components/comments/add-comment-reply/add-comment-reply.component';
import { ListCommentsComponent } from './components/comments/list-comments/list-comments.component';
import { RemoveCommentComponent } from './components/comments/remove-comment/remove-comment.component';
import { RemoveCommentReplyComponent } from './components/comments/remove-comment-reply/remove-comment-reply.component';

export default {
  title: 'Samples/Work with comments',
  component: CommenstStoriesComponent,
  parameters: {
    docs: false,
  },
  decorators: [
    moduleMetadata({
      declarations: [
        CommentsComponent,
        DocumentEditorComponent,
        AddCommentComponent,
        AddCommentReplyComponent,
        ListCommentsComponent,
        RemoveCommentComponent,
        RemoveCommentReplyComponent
      ]
    }),
  ],
} as Meta;

const Template: Story<any> = (args) => ({
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