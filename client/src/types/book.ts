export interface Book {
    id: string;
    name: string;
    author: string;
    status: 'TO_READ' | 'COMPLETED' | 'IN_PROGRESS';
    startDate?: Date;
    finishDate?: Date;
}