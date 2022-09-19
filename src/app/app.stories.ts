// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { DocumentEditorComponent } from '@onlyoffice/document-editor-angular';

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: 'DocumentEditorComponent',
  component: DocumentEditorComponent,
  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
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

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<DocumentEditorComponent> = (args: DocumentEditorComponent) => ({
  props: args,
});

export const FormTemplate = Template.bind({});
FormTemplate.storyName = "Form";
FormTemplate.args = {
    id: "oformEditor",
    documentServerUrl: "http://192.168.0.169:85/",
    config: {
        document: {
            fileType: "oform",
            title: "demo.oform",
            url: "https://d2nlctn12v279m.cloudfront.net/assets/docs/samples/demo.oform",
        },
        documentType: "word",
    },
    height: "600px"
};

export const DocumentTemplate = Template.bind({});
DocumentTemplate.storyName = "Document";
DocumentTemplate.args = {
    id: "docxEditor",
    documentServerUrl: "http://192.168.0.169:85/",
    config: {
        document: {
            fileType: "docx",
            title: "demo.docx",
            url: "https://d2nlctn12v279m.cloudfront.net/assets/docs/samples/demo.docx",
        },
        documentType: "word",
    },
    height: "600px"
};

export const SpreadsheetTemplate = Template.bind({});
SpreadsheetTemplate.storyName = "Spreadsheet";
SpreadsheetTemplate.args = {
    id: "xlsxEditor",
    documentServerUrl: "http://192.168.0.169:85/",
    config: {
        document: {
            fileType: "xlsx",
            title: "demo.xlsx",
            url: "https://d2nlctn12v279m.cloudfront.net/assets/docs/samples/demo.xlsx",
        },
        documentType: "cell",
    },
    height: "600px"
};

export const PresentationTemplate = Template.bind({});
PresentationTemplate.storyName = "Presentation";
PresentationTemplate.args = {
    id: "pptxEditor",
    documentServerUrl: "http://192.168.0.169:85/",
    config: {
        document: {
            fileType: "pptx",
            title: "demo.pptx",
            url: "https://d2nlctn12v279m.cloudfront.net/assets/docs/samples/demo.pptx",
        },
        documentType: "slide",
    },
    height: "600px"
};