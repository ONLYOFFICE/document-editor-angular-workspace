import { Component, Input } from '@angular/core';

@Component({
  selector: 'radio-content-control',
  templateUrl: './radio-content-control.component.html',
  styleUrls: [ './../content-controls.component.css' ]
})
export class RadioContentControlComponent {
  @Input() id: string;
  @Input() label: string;
  @Input() options: any [];
  @Input() setFormValue: (id: string, value: string) => void;

  getLabel(nameTag: string) {
    return nameTag.replace(/([a-z])([A-Z])/g, '$1 $2');
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