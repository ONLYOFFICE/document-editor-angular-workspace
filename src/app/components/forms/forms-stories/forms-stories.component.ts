import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DocumentEditorModule, IConfig } from '@onlyoffice/document-editor-angular';
import { FormsService } from 'src/app/service/forms.service';

@Component({
  selector: 'forms-stories',
  templateUrl: './forms-stories.component.html',
  imports: [DocumentEditorModule, FormsModule, NgSelectModule],
  providers: [FormsService]
})
export class FormsStoriesComponent implements OnInit {
  @Input() editorId: string;
  @Input() documentServerUrl: string;
  @Input() config: IConfig;

  loading = false;
  selectedForm: any;

  constructor( public formsService: FormsService ) {}

  ngOnInit(): void {
    this.loading = true;
    this.formsService.getForms().subscribe(() => {
      this.loading = false
    });
  }

  onChangeSelect(): void {
    let newConfig = this.config;
    newConfig = {...newConfig}

    newConfig.document!.title = this.selectedForm.title;
    newConfig.document!.url = this.selectedForm.url;
    newConfig.document!.key = "pdf" + Math.random();

    this.config = newConfig;
  }
}