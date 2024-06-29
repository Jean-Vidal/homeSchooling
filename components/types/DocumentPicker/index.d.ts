declare module 'expo-document-picker' {
    export interface DocumentResult {
      type: 'cancel' | 'success';
      uri?: string;
      name?: string;
      size?: number;
      mimeType?: string;
    }
  
    export function getDocumentAsync(options?: DocumentPickerOptions): Promise<DocumentResult>;
  }
  