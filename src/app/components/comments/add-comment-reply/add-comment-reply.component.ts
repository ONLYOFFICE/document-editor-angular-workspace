import { CommonModule } from '@angular/common';
import {Component, Input} from '@angular/core'

@Component({
  selector: 'add-comment-reply',
  templateUrl: './add-comment-reply.component.html',
  styleUrls: ['../comments.component.css'],
  imports: [ CommonModule ]
})
export class AddCommentReplyComponent {
  @Input() connector: any;
  @Input() userName: string;
  @Input() comment: any;

  reply = "";
  showAddReply = false;

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  addReply () {
    if (Boolean(this.reply)) {
      var currentdate = Date.now(); 
      var datetime = "" + currentdate;

      this.comment["Data"]["Replies"].push({ Text: this.reply, Time: datetime, UserName: this.userName });

      this.connector.executeMethod("ChangeComment", [this.comment["Id"], this.comment["Data"]]);

      this.reply = "";
      this.showAddReply = false;
    }
  }
}
