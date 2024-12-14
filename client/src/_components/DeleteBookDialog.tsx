import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DeleteBookDialogProps {
    bookId: string;
    onClose: () => void;
    onDelete: (bookId: string) => void;
}

const DeleteBookDialog = ({ bookId, onClose, onDelete }: DeleteBookDialogProps) => {
    const handleDelete = () => {
        onDelete(bookId);
        onClose();
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Book</DialogTitle>
                </DialogHeader>
                <div>Are you sure you want to delete this book?</div>
                <DialogFooter>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDelete}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteBookDialog;
