import { Story, Meta } from '@storybook/angular/types-6-0';
import { DocumentEditorComponent } from '@onlyoffice/document-editor-angular';
import config from "../../config/config.json";

export default {
  title: 'DocumentEditorComponent',
  component: DocumentEditorComponent,
  parameters: {
    docs: false,
  },
  argTypes: {
    documentType: {
        options: ["word", "cell", "slide"],
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
    events_onAppReady: { action: 'onAppReady' },
    events_onDocumentReady: { action: 'onDocumentReady' },
    events_onDocumentStateChange: { action: 'onDocumentStateChange' },
    events_onError: { action: 'onError' }
  },
} as Meta;

const Template: Story<DocumentEditorComponent> = (args: DocumentEditorComponent) => ({
  props: args,
});

export const FormTemplate = Template.bind({});
FormTemplate.storyName = "Form";
FormTemplate.args = {
    id: "oformEditor",
    documentServerUrl: config.documentserverUrl,
    config: {
        document: {
            fileType: "oform",
            title: "demo.oform",
            url: config.demoStorage + "demo.oform",
        },
        documentType: "word",
    },
    height: "600px"
};

export const DocumentTemplate = Template.bind({});
DocumentTemplate.storyName = "Document";
DocumentTemplate.args = {
    id: "docxEditor",
    documentServerUrl: config.documentserverUrl,
    config: {
        document: {
            fileType: "docx",
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
            title: "demo.pptx",
            url: config.demoStorage + "demo.pptx",
        },
        documentType: "slide",
    },
    height: "600px"
};