import { Component, Input } from '@angular/core';

@Component({
  selector: 'input-content-control',
  templateUrl: './input-content-control.component.html',
  styleUrls: [ './../content-controls.component.css' ]
})
export class InputContentControlComponent {
  @Input() id: string;
  @Input() value: string;
  @Input() label: string;
  @Input() setFormValue: (id: string, value: string) => void;

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}