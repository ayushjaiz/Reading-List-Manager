import { Button } from '@/components/ui/button';
import { Book } from '../types/book';
import BookTable from './BookTable';
import { useEffect, useState } from 'react';
import AddBookDialog from './AddBookDialog';

export function BookDashboard() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);

  async function getBooks() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/books', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }

      const fetchedBooks = await response.json();
      setBooks(fetchedBooks);
    } catch (err) {
      console.error(err);
      setError((err as Error).message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }

  const handleAddBook = async (newBook: Book) => {
    try {
      const response = await fetch('http://localhost:3001/api/books/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newBook),
      });

      if (!response.ok) {
        throw new Error('Failed to add book');
      }

      getBooks();
      setIsAddDialogOpen(false);
      console.log('Book added successfully');
    } catch (err) {
      console.error(err);
      setError((err as Error).message || 'Failed to add book');
    }
  };

  const handleDelete = async (bookId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/books/${bookId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete book');
      }

      getBooks();
      console.log("Book deleted sucessfully")
    } catch (err) {
      console.error(err);
      setError((err as Error).message || 'Failed to delete book');
    }
  };

  const handleEdit = async (updatedBook: Book) => {
    try {
      const response = await fetch(`http://localhost:3001/api/books/${updatedBook.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updatedBook),
      });

      if (!response.ok) {
        throw new Error('Failed to update book');
      }

      // Reload 
      getBooks();
      console.log("Book updated sucessfully")
    } catch (err) {
      console.error(err);
      setError((err as Error).message || 'Failed to update book');
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <main className="min-h-screen bg-background px-52">
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-5">Book Dashboard</h1>

        <div className="flex justify-end items-center mb-4">
          <Button onClick={() => setIsAddDialogOpen(true)}>Add Book</Button>
        </div>

        {/* Loading State */}
        {loading && <div className="text-center font-medium">Loading books...</div>}

        {/* Error State */}
        {error && <div className="text-center text-red-500 font-medium">Error: {error}</div>}

        {/* Book Table */}
        {!loading && !error && books.length > 0 && (
          <BookTable books={books} onEdit={handleEdit} onDelete={handleDelete} />
        )}

        {/* Empty State */}
        {!loading && !error && books.length === 0 && (
          <div className="text-center text-gray-500 font-medium">No books available.</div>
        )}
      </div>

      {/* Add Book Dialog */}
      {isAddDialogOpen && (
        <AddBookDialog onClose={() => setIsAddDialogOpen(false)} onSave={handleAddBook} />
      )}
    </main>
  );
}
