import {Component, Input} from '@angular/core'

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  @Input() userName: string;
  @Input() comments: any[];
  @Input() connector: any;

}
