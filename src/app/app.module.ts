import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DocumentEditorModule } from '@onlyoffice/document-editor-angular';

import { AppComponent } from './app.component';
import { AddCommentComponent } from './components/comments/add-comment/add-comment.component';
import { AddCommentReplyComponent } from './components/comments/add-comment-reply/add-comment-reply.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ListCommentsComponent } from './components/comments/list-comments/list-comments.component';
import { RemoveCommentComponent } from './components/comments/remove-comment/remove-comment.component';
import { RemoveCommentReplyComponent } from './components/comments/remove-comment-reply/remove-comment-reply.component';
import { CommenstStoriesComponent } from './components/comments/comments-stories/commenst-stories.component';
import { ContentControlsStoriesComponent } from './components/content-controls/content-controls-stories/content-controls-stories.component';
import { ContentControlsComponent } from './components/content-controls/content-controls.component';
import { InputContentControlComponent } from './components/content-controls/input-content-control/input-content-control.component';
import { RadioContentControlComponent } from './components/content-controls/radio-content-control/radio-content-control.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormsStoriesComponent } from './components/forms/forms-stories/forms-stories.component';
import { HttpClientModule } from '@angular/common/http';
import { ReviewComponent } from './components/review/review.component';
import { ReviewStoriesComponent } from './components/review/review-stories/review-stories.component';

@NgModule({
  declarations: [
    AppComponent,
    CommentsComponent,
    ListCommentsComponent,
    AddCommentComponent,
    AddCommentReplyComponent,
    RemoveCommentComponent,
    RemoveCommentReplyComponent,
    CommenstStoriesComponent,
    ContentControlsStoriesComponent,
    ContentControlsComponent,
    InputContentControlComponent,
    RadioContentControlComponent,
    FormsStoriesComponent,
    ReviewComponent,
    ReviewStoriesComponent
  ],
  imports: [
    BrowserModule,
    DocumentEditorModule,
    NgSelectModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
