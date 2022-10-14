/*
* (c) Copyright Ascensio System SIA 2022
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

export interface IConfig {
  document: {
    fileType: string;
    key?: string;
    title: string;
    permissions?: {
      comment?: boolean;
      download?: boolean;
      edit?: boolean;
      review?: boolean;
    }
    url: string;
  }
  documentType: string;
  editorConfig?: {
    callbackUrl?: string;
    lang?: string,
    mode?: string;
    user?: {
      id?: string;
      name?: string;
    }
  }
  height?: string;
  token?: string;
  type?: string;
  width?: string;
  events_onAppReady?: (editor: object) => void;
  events_onDocumentReady?: (editor: object) => void;
  events_onDocumentStateChange?: (data: object) => void;
  events_onError?: (error: string) => void;
}
