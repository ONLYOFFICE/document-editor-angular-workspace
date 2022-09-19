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
}