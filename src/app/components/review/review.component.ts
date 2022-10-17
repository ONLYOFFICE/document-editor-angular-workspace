import {Component, Input} from '@angular/core'

@Component({
  selector: 'review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {
  @Input() connector: any;

  prevReview() {
    this.connector.executeMethod("MoveToNextReviewChange", [false]);
  };

  nextReview() {
    this.connector.executeMethod("MoveToNextReviewChange");
  };

  acceptReview() {
    this.connector.executeMethod("AcceptReviewChanges");
  };

  rejectReview() {
    this.connector.executeMethod("RejectReviewChanges");
  };
}
