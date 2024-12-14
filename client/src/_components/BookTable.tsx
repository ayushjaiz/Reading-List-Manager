import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Book } from "@/types/book";
import ActionButton from "./ActionButton";

interface BookTableProps {
    books: Book[];
    onEdit: (book: Book) => void;
    onDelete: (bookId: string) => void;
}

const validateDate = (date?: Date) => {
    return date ? new Date(date).toLocaleDateString() : '-'
}

const BookTable = ({ books, onEdit, onDelete }: BookTableProps) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-center">Author</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Start Date</TableHead>
                    <TableHead className="text-center">Finish Date</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {books.map((book, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{book.name}</TableCell>
                        <TableCell className="text-center">{book.author}</TableCell>
                        <TableCell className="text-center">
                            <span
                                className={`
                                        px-2 py-1 rounded-md text-sm font-medium
                                        ${book.status === "TO_READ"
                                        ? "bg-blue-100 text-blue-600"
                                        : book.status === "IN_PROGRESS"
                                            ? "bg-yellow-100 text-yellow-600"
                                            : book.status === "COMPLETED"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-gray-100 text-gray-600"
                                    }
        `}
                            >
                                {book.status}
                            </span>
                        </TableCell>
                        <TableCell className="text-center">{validateDate(book.startDate)}</TableCell>
                        <TableCell className="text-center">{validateDate(book.finishDate)}</TableCell>
                        <TableCell>
                            <ActionButton
                                book={book}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default BookTable;
