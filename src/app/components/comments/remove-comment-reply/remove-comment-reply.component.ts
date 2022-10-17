import {Component, Input} from '@angular/core'

@Component({
  selector: 'remove-comment-reply',
  templateUrl: './remove-comment-reply.component.html',
  styleUrls: ['../comments.component.css']
})
export class RemoveCommentReplyComponent {
  @Input() connector: any;
  @Input() comment: any;
  @Input() replyId: number;

  removeCommentReply () {
    let commentData = this.comment["Data"];
    commentData["Replies"].splice(this.replyId, 1);

    this.connector.executeMethod("ChangeComment", [this.comment["Id"], commentData]);
  }
}
