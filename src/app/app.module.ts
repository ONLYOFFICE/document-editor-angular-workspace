import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DocumentEditorModule } from '@onlyoffice/document-editor-angular';

import { AppComponent } from './app.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ListCommentsComponent } from './components/comments/list-comments.component';

@NgModule({
  declarations: [
    AppComponent,
    CommentsComponent,
    ListCommentsComponent
  ],
  imports: [
    BrowserModule,
    DocumentEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
