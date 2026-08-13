import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { RadioContentControlComponent } from './radio-content-control/radio-content-control.component';
import { InputContentControlComponent } from './input-content-control/input-content-control.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'content-controls',
  templateUrl: './content-controls.component.html',
  styleUrls: [ './content-controls.component.css' ],
  imports: [ CommonModule, InputContentControlComponent, RadioContentControlComponent ]
})
export class ContentControlsComponent implements OnChanges {
  @Input() contentControls: any[];
  @Input() selectedOption: any;
  @Output() selectedOptionChange: EventEmitter<any> = new EventEmitter();
  @Input() setFormValue: (id: string, value: string) => void;

  copyContentControls: any[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty("contentControls")) {
      this.copyContentControls = this.getCopyContentControls()
    }
  }

  getCopyContentControls () {
    let copyContentControls: any[] = [];

    for (i = 0; i < this.contentControls?.length; i++) {
      var copyContentControl = this.contentControls[i];
      copyContentControls[i] = {...copyContentControl};
    }

    let groupsRadioControls: any[] = copyContentControls.filter(contentControl => contentControl.Tag != "" && contentControl.Type == "radio").reduce((r, a) => {
      r[a.GroupKey] = r[a.GroupKey] || [];
      r[a.GroupKey].push({Tag: a.Tag, checked: a.Value});
      return r;
    }, {});

    for (const [key, value] of Object.entries(groupsRadioControls)) {
      let index = [];
      let first = true;

      for (var i = 0; i < copyContentControls.length; i++) {
        if (copyContentControls[i].GroupKey && copyContentControls[i].GroupKey == key) {
          index.push(i);
        } 
      }

      for (var i = 0; i < index.length; i++) {
        if (first) {
          copyContentControls[index[i]].Tag = key;
          copyContentControls[index[i]].Value = value;
          first = false;
        } else {
          copyContentControls.splice(index[i], 1);
        }
      }
    }

    return copyContentControls.filter(contentControl => contentControl.Tag != "");
  }

  getLabel(nameTag: string) {
    return nameTag.replace(/([a-z])([A-Z])/g, '$1 $2');
  }

  onChangeSelectedOption = (value: any) => {
    this.selectedOptionChange.emit(value);
  }

 }