export interface StartUp {
  authorId: string;
  content: string;
  id: string;
  imageId: string;
  title: string;
  error?: string;
}

export type Role = 'Start-up' | 'Investor';
