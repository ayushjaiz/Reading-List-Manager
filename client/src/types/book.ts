export interface Book {
    id: string;
    name: string;
    author: string;
    status: 'reading' | 'completed' | 'to-read';
    startDate: string | null;
    finishDate: string | null;
}