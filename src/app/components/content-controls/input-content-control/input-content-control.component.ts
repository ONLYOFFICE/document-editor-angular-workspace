import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'input-content-control',
  templateUrl: './input-content-control.component.html',
  styleUrls: [ './../content-controls.component.css' ]
})
export class InputContentControlComponent {
  @Input() id: string;
  @Input() value: string;
  @Input() label: string;
  @Input() selectedOption: any;
  @Output() onChangeSelectedOption: EventEmitter<any> = new EventEmitter<any>();
  @Input() setFormValue: (id: string, value: string) => void;

  getValue(event: Event): string {
    this.setFormValue((event.target as HTMLInputElement).id, (event.target as HTMLInputElement).value);
    this.onChangeSelectedOption.emit({label: "Custom Data"});
    return (event.target as HTMLInputElement).value;
  }
}