import { useQuery } from '@tanstack/react-query';
import { Book } from '../types/book'
import { DataTable } from './DataTable'
import { columns } from './colums'
import { Button } from '@/components/ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'

// Fetch books with cookies
async function getBooks(): Promise<Book[]> {
  const response = await fetch('http://localhost:3001/api/books', {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }

  return response.json();
}

// Inside your component
export function BookDashboard() {

  // Query books
  const { data: books, isLoading, isError, refetch } = useQuery<Book[]>({
    queryKey: ['books'],
    queryFn: getBooks,
  });

  if (isError) {
    return <div>Error loading books. Please try again.</div>;
  }

  return (
    <main className="min-h-screen bg-background px-52">
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-5">Book Dashboard</h1>
        <div className="flex justify-end items-center mb-4">

          <Button onClick={() => refetch()} disabled={isLoading}>
            {isLoading ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              'Add Book'
            )}
          </Button>
        </div>
        {isLoading ? (
          <div>Adding books...</div>
        ) : (
          <DataTable columns={columns} data={books || []} />
        )}
      </div>
    </main>
  );
}

