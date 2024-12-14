import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Book } from '@/types/book';

interface AddBookDialogProps {
    onClose: () => void;
    onSave: (newBook: Book) => void;
}

const AddBookDialog = ({ onClose, onSave }: AddBookDialogProps) => {
    const [formData, setFormData] = useState<Partial<Book>>({
        name: '',
        author: '',
        status: 'TO_READ',
        startDate: undefined,
        finishDate: undefined,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === 'date'
                    ? value
                        ? new Date(value)
                        : undefined
                    : value || null,
        }));
    };

    const handleSave = () => {
        const cleanedData = {
            ...formData,
            startDate: formData.startDate || null,
            finishDate: formData.finishDate || null,
        };
        onSave(cleanedData as Book);
    };

    const formatDate = (date?: Date) => {
        return date ? date.toISOString().split('T')[0] : '';
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Book</DialogTitle>
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
                            value={formData.status || 'TO_READ'}
                            onChange={handleChange}
                            className="border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                        >
                            <option value="TO_READ">TO_READ</option>
                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                            <option value="COMPLETED">COMPLETED</option>
                        </select>
                    </div>

                    {/* Start Date */}
                    {['IN_PROGRESS', 'COMPLETED'].includes(formData.status || '') && (
                        <div className="grid gap-2">
                            <label htmlFor="startDate" className="text-sm font-medium">
                                Start Date
                            </label>
                            <Input
                                id="startDate"
                                name="startDate"
                                type="date"
                                value={formatDate(formData.startDate)}
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
                                value={formatDate(formData.finishDate)}
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

export default AddBookDialog;
