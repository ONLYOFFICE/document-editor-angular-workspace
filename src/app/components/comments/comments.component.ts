import {Component, Input} from '@angular/core'
import { ListCommentsComponent } from './list-comments/list-comments.component';
import { AddCommentComponent } from './add-comment/add-comment.component';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  imports: [ ListCommentsComponent, AddCommentComponent ]
})
export class CommentsComponent {
  @Input() userName: string;
  @Input() comments: any[];
  @Input() connector: any;

}
