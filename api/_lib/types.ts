export type FileType = 'png' | 'jpeg';
export type Theme = 'light' | 'dark';

export interface ParsedRequest {
    fileType: FileType;
    text: string;
    subtitle: any;
    theme: Theme;
    md: boolean;
    hasImage: boolean;
}
