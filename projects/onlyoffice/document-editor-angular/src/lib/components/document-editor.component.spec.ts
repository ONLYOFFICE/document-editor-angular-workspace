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
import { Config, DocEditor } from '@onlyoffice/doceditor-types';

import { DocumentEditorComponent } from './document-editor.component';

const baseConfig: Config = {
  document: {
    fileType: "docx",
    key: "Khirz6zTPdfd7",
    title: "Example Document Title.docx",
    url: "https://example.com/url-to-example-document.docx"
  },
  documentType: "word",
  editorConfig: {
    callbackUrl: "https://example.com/url-to-callback.ashx"
  }
};

const withKey = (key: string): Config => ({
  ...baseConfig,
  document: { ...baseConfig.document!, key },
});

let openedKeys: string[] = [];

// Stands in for api.js: replaces the placeholder with its own iframe, and puts
// it back on destroyEditor().
const installFakeDocsAPI = () => {
  window.DocsAPI = {
    DocEditor: (id: string, config: Config) => {
      openedKeys.push(config.document!.key!);

      const target = document.getElementById(id)!;
      const iframe = document.createElement("iframe");
      iframe.setAttribute("name", "frameEditor");
      target.parentNode!.replaceChild(iframe, target);

      return {
        destroyEditor: () => {
          const placeholder = document.createElement("div");
          placeholder.setAttribute("id", id);
          iframe.parentNode?.replaceChild(placeholder, iframe);
        },
      } as unknown as DocEditor;
    },
  };
};

// Keeps api.js pending until the returned function fires its onload by hand.
const holdApiScript = () => {
  const appendChild = document.body.appendChild.bind(document.body);
  let script: any;

  spyOn(document.body, "appendChild").and.callFake(((node: any) => {
    if (node?.id !== "onlyoffice-api-script") return appendChild(node);
    script = node;
    return node;
  }) as any);

  return () => {
    installFakeDocsAPI();
    script.onload();
  };
};

@Component({
  template: `
    @if (mounted()) {
      <document-editor
        id="docxEditor"
        documentServerUrl="http://documentserver/"
        [shardkey]="false"
        [config]="config()"
        [onLoadComponentError]="onLoadComponentError"
      ></document-editor>
    }
  `,
  standalone: false,
})
class HostComponent {
  mounted = signal(true);
  config = signal<Config>(baseConfig);
  errors: Array<{ errorCode: number, errorDescription: string }> = [];

  onLoadComponentError = (errorCode: number, errorDescription: string) => {
    this.errors.push({ errorCode, errorDescription });
  };
}

describe('DocumentEditorAngularComponent', () => {
  let component: DocumentEditorComponent;
  let fixture: ComponentFixture<DocumentEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentEditorComponent ],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentEditorComponent);
    component = fixture.componentInstance;

    component.id="docEditor";
    component.documentServerUrl="http://documentserver/";
    component.shardkey = "shardkey";

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('DocumentEditorAngularComponent lifecycle', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  const editor = () => window.DocEditor?.instances["docxEditor"];
  const iframes = () => document.querySelectorAll("iframe[name='frameEditor']");
  const hostedIframes = () => document.querySelectorAll("document-editor iframe[name='frameEditor']");
  const placeholders = () => document.querySelectorAll("#docxEditor");

  // loadScript settles on a plain promise, which no test scheduler tracks.
  const flush = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

  const createHost = async () => {
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    await flush();
  };

  const setMounted = async (mounted: boolean) => {
    host.mounted.set(mounted);
    await fixture.whenStable();
    await flush();
  };

  const setConfig = async (config: Config) => {
    host.config.set(config);
    await fixture.whenStable();
    await flush();
  };

  beforeEach(async () => {
    openedKeys = [];
    document.querySelectorAll("#onlyoffice-api-script").forEach((node) => node.remove());

    await TestBed.configureTestingModule({
      declarations: [ DocumentEditorComponent, HostComponent ],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();
  });

  afterEach(() => {
    window.DocsAPI = undefined;
    window.DocEditor = undefined;
  });

  it('builds the editor and lets Docs replace the placeholder', async () => {
    installFakeDocsAPI();
    await createHost();

    expect(editor()).toBeDefined();
    expect(openedKeys).toEqual(["Khirz6zTPdfd7"]);
    expect(hostedIframes().length).toBe(1);
    expect(placeholders().length).toBe(0);
  });

  it('destroys the editor and removes its iframe when the component is destroyed', async () => {
    installFakeDocsAPI();
    await createHost();

    expect(() => fixture.destroy()).not.toThrow();

    expect(editor()).toBeUndefined();
    expect(iframes().length).toBe(0);
  });

  it('can be created again after being destroyed', async () => {
    installFakeDocsAPI();
    await createHost();

    await setMounted(false);

    expect(editor()).toBeUndefined();
    expect(iframes().length).toBe(0);
    expect(placeholders().length).toBe(0);

    await setMounted(true);

    expect(editor()).toBeDefined();
    expect(openedKeys).toEqual(["Khirz6zTPdfd7", "Khirz6zTPdfd7"]);
    expect(iframes().length).toBe(1);
    expect(hostedIframes().length).toBe(1);
    expect(host.errors).toEqual([]);
  });

  it('builds the editor from the config it has when api.js arrives', async () => {
    const releaseScript = holdApiScript();
    await createHost();

    await setConfig(withKey("aNewKey"));

    releaseScript();
    await flush();

    expect(openedKeys).toEqual(["aNewKey"]);
    expect(hostedIframes().length).toBe(1);
  });

  it('recreates the editor when the config changes', async () => {
    installFakeDocsAPI();
    await createHost();

    const first = editor();

    await setConfig(withKey("aNewKey"));

    expect(editor()).toBeDefined();
    expect(editor()).not.toBe(first);
    expect(openedKeys).toEqual(["Khirz6zTPdfd7", "aNewKey"]);
    expect(hostedIframes().length).toBe(1);
  });
});
