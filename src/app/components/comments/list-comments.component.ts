import {Component, Input, SimpleChanges} from '@angular/core'

@Component({
  selector: 'list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class ListCommentsComponent {
  @Input() comments: any[];

  ngOnChanges(changes: SimpleChanges) {
    console.log("sdfsadf");
    console.log(changes);
  }

  dateParser(date: string) {
    return new Date(parseInt(date, 10)).toLocaleString();
  }
}