import {Component, Input, SimpleChanges, OnChanges} from '@angular/core'
import { AddCommentReplyComponent } from '../add-comment-reply/add-comment-reply.component';
import { RemoveCommentReplyComponent } from '../remove-comment-reply/remove-comment-reply.component';
import { RemoveCommentComponent } from '../remove-comment/remove-comment.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['../comments.component.css'],
  imports: [ CommonModule, RemoveCommentComponent, AddCommentReplyComponent, RemoveCommentReplyComponent ]
})
export class ListCommentsComponent implements OnChanges {
  @Input() connector: any;
  @Input() userName: string;
  @Input() comments: any[];

  goToComment (e: any) {
    if (e.target.parentElement.id) {
      this.connector.executeMethod("MoveToComment",[e.target.parentElement.id]);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty("connector")) {
      if (this.connector) {
        this.connector.attachEvent("onAddComment",  function (val:any) {
          console.log("onAddComment");
          var comments = this.comments;
          var index = this.comments.findIndex((comment:any) => comment.Id === val.Id)

          if (index == -1) {
             this.comments = [val, ...comments];
          }
        }.bind(this));

        this.connector.attachEvent("onRemoveComment",  function (val:any) {
          console.log("onRemoveComment");
          const index = this.comments.findIndex((comment:any) => comment.Id === val.Id);

          if (index !== -1) {
            this.comments.splice(index, 1);
          }
        }.bind(this));

        this.connector.attachEvent("onChangeCommentData",  function (val:any) {
          const index = this.comments.findIndex((comment:any) => comment.Id === val.Id);

          if (index !== -1) {
            this.comments[index].Data = val.Data;
          }
        }.bind(this));
      }
    }
  }

  dateParser(date: string) {
    return new Date(parseInt(date, 10)).toLocaleString();
  }
}