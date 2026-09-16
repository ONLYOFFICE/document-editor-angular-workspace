# Change Log

## [Unreleased]
- fix the editor not being reusable after the component is destroyed, for example on a soft navigation
- the id is no longer rendered on the document-editor host element, so ONLYOFFICE Docs replaces the placeholder inside it instead of the host itself; the host is kept out of layout with display: contents
- fix an editor being left behind when the component is destroyed while api.js is still loading
- fix the events_onAppReady input never being called
- added the document-editor-preload component for caching the editor static assets before a document is opened (ONLYOFFICE Docs 9.0 and later)
- deprecated the legacy flat inputs (document_fileType, document_title, documentType, editorConfig_lang, height, type, width and all events_* callbacks) in favor of the config object

## 7.6.0
- breaking: removed IConfig export, use Config from @onlyoffice/doceditor-types instead

## 7.5.1
- fix IConfig (fields pointerMode and slidePlayerBackground is not required)

## 7.5.0
- angular 20
- update IConfig for Document Server v9.0

## 6.4.0
- angular 19
- added shardkey property
- update IConfig for Document Server v8.3

## 5.3.0
- angular 18
- editorConfig/customization/logo#imageLight
- editorConfig/customization/logo#visible
- editorConfig/customization#close
- editorConfig/plugins#options
- deprecated editorConfig#location
- events#onRequestStartFilling
- events#onSubmit

## 4.2.0
- IConfig->document is not required
- fix re-rendering of component after init editors
- added props events_onRequestUsers

## 4.0.0
- angular 17

## 3.0.0
- angular 16

## 2.1.0
- improved load api.js
- updated IConfig
- bump dependencies

## 2.0.0
- extended IConfig
- angular 15

## 1.2.1
- added component property onLoadComponentError

## 1.1.0
- extended IConfig

## 1.0.1
- Initial release
