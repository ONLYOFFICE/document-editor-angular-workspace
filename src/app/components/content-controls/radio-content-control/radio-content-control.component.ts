import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'radio-content-control',
  templateUrl: './radio-content-control.component.html',
  styleUrls: [ './../content-controls.component.css' ]
})
export class RadioContentControlComponent {
  @Input() id: string;
  @Input() label: string;
  @Input() options: any [];
  @Input() selectedOption: any;
  @Output() onChangeSelectedOption: EventEmitter<any> = new EventEmitter<any>();
  @Input() setFormValue: (id: string, value: string) => void;

  getLabel(nameTag: string) {
    return nameTag.replace(/([a-z])([A-Z])/g, '$1 $2');
  }

  onChange(event: Event) {
    this.setFormValue((event.target as HTMLInputElement).id, 'true');
    this.onChangeSelectedOption.emit({label: "Custom Data"});
  }

  isChecked(nameTag: string) {
    for (var i = 0; i < this.options.length; i++) {
      if (this.options[i].checked == true) {
        return nameTag == this.options[i].Tag;
      }
    }

    return false;
  }
}