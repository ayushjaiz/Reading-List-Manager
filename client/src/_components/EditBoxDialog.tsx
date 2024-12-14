import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Book } from '@/types/book';

const formatDate = (date: Date | string | undefined): string => {
    if (!date) return '';
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    return !isNaN(parsedDate.getTime()) ? parsedDate.toISOString().split('T')[0] : '';
};

interface EditBookDialogProps {
    book: Book;
    onClose: () => void;
    onSave: (updatedBook: Book) => void;
}

const EditBookDialog = ({ book, onClose, onSave }: EditBookDialogProps) => {
    const [formData, setFormData] = useState({
        ...book,
        startDate: formatDate(book.startDate),
        finishDate: formatDate(book.finishDate),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        const cleanedData: Book = {
            ...formData,
            startDate: formData.startDate ? new Date(formData.startDate) : undefined,
            finishDate: formData.finishDate ? new Date(formData.finishDate) : undefined,
        };
        onSave(cleanedData);
        onClose();
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Book</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {/* Book Name */}
                    <div className="grid gap-2">
                        <label htmlFor="name" className="text-sm font-medium">
                            Book Name
                        </label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name || ''}
                            onChange={handleChange}
                            placeholder="Book Name"
                        />
                    </div>

                    {/* Author */}
                    <div className="grid gap-2">
                        <label htmlFor="author" className="text-sm font-medium">
                            Author
                        </label>
                        <Input
                            id="author"
                            name="author"
                            value={formData.author || ''}
                            onChange={handleChange}
                            placeholder="Author"
                        />
                    </div>

                    {/* Status */}
                    <div className="grid gap-2">
                        <label htmlFor="status" className="text-sm font-medium">
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status || ''}
                            onChange={handleChange}
                            className="border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                        >
                            <option value="" disabled>
                                Select a status
                            </option>
                            <option value="TO_READ">TO_READ</option>
                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                            <option value="COMPLETED">COMPLETED</option>
                        </select>
                    </div>

                    {/* Start Date */}
                    {['IN_PROGRESS', 'COMPLETED'].includes(formData.status) && (
                        <div className="grid gap-2">
                            <label htmlFor="startDate" className="text-sm font-medium">
                                Start Date
                            </label>
                            <Input
                                id="startDate"
                                name="startDate"
                                type="date"
                                value={formData.startDate || ''}
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    {/* Finish Date */}
                    {formData.status === 'COMPLETED' && (
                        <div className="grid gap-2">
                            <label htmlFor="finishDate" className="text-sm font-medium">
                                Finish Date
                            </label>
                            <Input
                                id="finishDate"
                                name="finishDate"
                                type="date"
                                value={formData.finishDate || ''}
                                onChange={handleChange}
                            />
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditBookDialog;
