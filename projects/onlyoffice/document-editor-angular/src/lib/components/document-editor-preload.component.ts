/*
* (c) Copyright Ascensio System SIA 2026
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'document-editor-preload',
  template: '<iframe #preload title="onlyoffice-preload" tabindex="-1" aria-hidden="true" style="display: none;"></iframe>',
  styles: [
    ':host { display: contents; }'
  ],
  standalone: false
})
export class DocumentEditorPreloadComponent implements OnInit, OnChanges {
  @Input() documentServerUrl: string;

  @ViewChild('preload', { static: true }) private preload: ElementRef<HTMLIFrameElement>;

  ngOnInit(): void {
    this.setSource();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['documentServerUrl'] && !changes['documentServerUrl'].firstChange) {
      this.setSource();
    }
  }

  // The src is written as an attribute instead of being bound in the template:
  // an iframe src is a resource URL for Angular, so a binding would have to go
  // through DomSanitizer from @angular/platform-browser, which this library
  // does not depend on.
  private setSource = () => {
    let url = this.documentServerUrl;
    if (!url.endsWith("/")) url += "/";

    this.preload.nativeElement.setAttribute("src", `${url}web-apps/apps/api/documents/preload.html`);
  }
}
