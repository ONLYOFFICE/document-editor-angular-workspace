import {Component, Input} from '@angular/core'

@Component({
  selector: 'remove-comment',
  templateUrl: './remove-comment.component.html',
  styleUrls: ['../comments.component.css']
})
export class RemoveCommentComponent {
  @Input() connector: any;
  @Input() commentId: string;

  removeComment () {
    this.connector.executeMethod("RemoveComments", [[this.commentId]]);
  }
}
