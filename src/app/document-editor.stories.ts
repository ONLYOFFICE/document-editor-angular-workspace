import { StoryFn, Meta } from '@storybook/angular';
import { DocumentEditorComponent } from '@onlyoffice/document-editor-angular';
import config from "../../config/config.json";

export default {
  title: 'DocumentEditorComponent',
  component: DocumentEditorComponent,
  tags: ['autodocs'],
  argTypes: {
    documentType: {
        options: ["word", "cell", "slide", "pdf", "diagram"],
        control: { type: "select" },
    },
    editorConfig_lang: {
        options: [
            "en", "az", "be", "bg", "ca", "zh", "cs", "da", "nl", "fi",
            "fr", "gl", "de", "el", "hu", "id", "it", "ja", "ko", "lv",
            "lo", "nb", "pl", "pt", "ro", "ru", "sk", "sl", "es", "sv",
            "tr", "uk", "vi"
        ],
        control: { type: "select" },
    },
    type: {
        options: ["desktop", "mobile"],
        control: { type: "select" },
    },
    events_onAppReady: { action: "onAppReady" },
    events_onDocumentStateChange: { action: "onDocumentStateChange" },
    events_onMetaChange: { action: "onMetaChange" },
    events_onDocumentReady: { action: "onDocumentReady" },
    events_onInfo: { action: "onInfo" },
    events_onWarning: { action: "onWarning" },
    events_onError: { action: "onError" },
    events_onRequestSharingSettings: { action: "onRequestSharingSettings" },
    events_onRequestRename: { action: "onRequestRename" },
    events_onMakeActionLink: { action: "onMakeActionLink" },
    events_onRequestInsertImage: { action: "onRequestInsertImage" },
    events_onRequestSaveAs: { action: "onRequestSaveAs" },
    events_onRequestMailMergeRecipients: { action: "onRequestMailMergeRecipients" },
    events_onRequestCompareFile: { action: "onRequestCompareFile" },
    events_onRequestEditRights: { action: "onRequestEditRights" },
    events_onRequestHistory: { action: "onRequestHistory" },
    events_onRequestHistoryClose: { action: "onRequestHistoryClose" },
    events_onRequestHistoryData: { action: "onRequestHistoryData" },
    events_onRequestRestore: { action: "onRequestRestore" }
  },
} as Meta;

const Template: StoryFn<DocumentEditorComponent> = (args) => ({
  props: args,
});

export const DocumentTemplate = Template.bind({});
DocumentTemplate.storyName = "Document";
DocumentTemplate.args = {
    id: "docxEditor",
    documentServerUrl: config.documentserverUrl,
    config: {
        document: {
            fileType: "docx",
            key: "docx" + Math.random(),
            title: "demo.docx",
            url: config.demoStorage + "demo.docx",
        },
        documentType: "word",
    },
    height: "600px"
};

export const SpreadsheetTemplate = Template.bind({});
SpreadsheetTemplate.storyName = "Spreadsheet";
SpreadsheetTemplate.args = {
    id: "xlsxEditor",
    documentServerUrl: config.documentserverUrl,
    config: {
        document: {
            fileType: "xlsx",
            key: "xlsx" + Math.random(),
            title: "demo.xlsx",
            url: config.demoStorage + "demo.xlsx",
        },
        documentType: "cell",
    },
    height: "600px"
};

export const PresentationTemplate = Template.bind({});
PresentationTemplate.storyName = "Presentation";
PresentationTemplate.args = {
    id: "pptxEditor",
    documentServerUrl: config.documentserverUrl,
    config: {
        document: {
            fileType: "pptx",
            key: "pptx" + Math.random(),
            title: "demo.pptx",
            url: config.demoStorage + "demo.pptx",
        },
        documentType: "slide",
    },
    height: "600px"
};

export const FormTemplate = Template.bind({});
FormTemplate.storyName = "Form";
FormTemplate.args = {
    id: "pdfEditor",
    documentServerUrl: config.documentserverUrl,
    config: {
        document: {
            fileType: "pdf",
            key: "pdf" + Math.random(),
            title: "oform.pdf",
            url: config.demoStorage + "oform.pdf",
        },
        documentType: "word",
    },
    height: "600px"
};

export const DiagramTemplate = Template.bind({});
DiagramTemplate.storyName = "Diagram";
DiagramTemplate.args = {
    id: "diagramEditor",
    documentServerUrl: config.documentserverUrl,
    config: {
        document: {
            fileType: "vsdx",
            key: "vsdx" + Math.random(),
            title: "demo.vsdx",
            url: config.demoStorage + "demo.vsdx",
        },
        documentType: "diagram",
    },
    height: "600px"
};
