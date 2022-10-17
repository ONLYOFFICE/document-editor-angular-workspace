import {Component, Input} from '@angular/core'

@Component({
  selector: 'add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['../comments.component.css']
})
export class AddCommentComponent {
  @Input() connector: any;
  @Input() userName: string;

  comment="";

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  addComment () {
    if(Boolean(this.comment)) {
      var currentdate = Date.now(); 
      var datetime = "" + currentdate;

      this.connector.executeMethod("AddComment",[{Text: this.comment, UserName: this.userName, Time: datetime}]);
      this.comment = "";
    }
  }
}
