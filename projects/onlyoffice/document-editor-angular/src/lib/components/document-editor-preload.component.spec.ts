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

import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentEditorPreloadComponent } from './document-editor-preload.component';

@Component({
  template: `
    @if (mounted()) {
      <document-editor-preload [documentServerUrl]="documentServerUrl()"></document-editor-preload>
    }
  `,
  standalone: false
})
class HostComponent {
  mounted = signal(true);
  documentServerUrl = signal("http://documentserver/");
}

describe('DocumentEditorPreloadComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  const iframe = () =>
    fixture.nativeElement.querySelector("iframe[title='onlyoffice-preload']") as HTMLIFrameElement | null;

  const createHost = async (documentServerUrl = "http://documentserver/") => {
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    host.documentServerUrl.set(documentServerUrl);
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentEditorPreloadComponent, HostComponent ],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();
  });

  it('renders a hidden iframe pointing to the preload page', async () => {
    await createHost();

    expect(iframe()).not.toBeNull();
    expect(iframe()!.getAttribute("src")).toBe("http://documentserver/web-apps/apps/api/documents/preload.html");
    expect(iframe()!.style.display).toBe("none");
  });

  it('keeps the iframe out of the tab order and of the accessibility tree', async () => {
    await createHost();

    expect(iframe()!.getAttribute("tabindex")).toBe("-1");
    expect(iframe()!.getAttribute("aria-hidden")).toBe("true");
  });

  it('adds the missing trailing slash to the document server url', async () => {
    await createHost("http://documentserver");

    expect(iframe()!.getAttribute("src")).toBe("http://documentserver/web-apps/apps/api/documents/preload.html");
  });

  it('follows the document server url when it changes', async () => {
    await createHost();

    host.documentServerUrl.set("http://another-documentserver");
    await fixture.whenStable();

    expect(iframe()!.getAttribute("src")).toBe("http://another-documentserver/web-apps/apps/api/documents/preload.html");
  });

  it('removes the iframe when the component is destroyed', async () => {
    await createHost();

    host.mounted.set(false);
    await fixture.whenStable();

    expect(iframe()).toBeNull();
  });
});
