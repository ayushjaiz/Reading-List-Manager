import { useState } from 'react';
import { MoreHorizontal } from 'lucide-react'; 
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import EditBookDialog from './EditBoxDialog';
import DeleteBookDialog from './DeleteBookDialog';
import { Book } from '@/types/book';


interface ActionButtonProps {
    book: Book;
    onEdit: (book: Book) => void;
    onDelete: (bookId: string) => void;
}

const ActionButton = ({ book, onEdit, onDelete }: ActionButtonProps) => {
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                        Edit book
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
                        Delete book
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Edit Dialog */}
            {showEditDialog && (
                <EditBookDialog
                    book={book}
                    onClose={() => setShowEditDialog(false)}
                    onSave={onEdit}
                />
            )}

            {/* Delete Dialog */}
            {showDeleteDialog && (
                <DeleteBookDialog
                    bookId={book.id}
                    onClose={() => setShowDeleteDialog(false)}
                    onDelete={onDelete}
                />
            )}
        </>
    );
};

export default ActionButton;
