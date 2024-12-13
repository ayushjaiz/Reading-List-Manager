import { ColumnDef } from '@tanstack/react-table'
import { Book } from '../types/book'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const columns: ColumnDef<Book>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'author',
        header: 'Author',
    },
    {
        accessorKey: 'status',
        header: 'Status',
    },
    {
        accessorKey: 'startDate',
        header: 'Start Date',
        cell: ({ row }) => {
            const date = row.getValue('startDate') as string | null
            return date ? new Date(date).toLocaleDateString() : 'N/A'
        },
    },
    {
        accessorKey: 'finishDate',
        header: 'Finish Date',
        cell: ({ row }) => {
            const date = row.getValue('finishDate') as string | null
            return date ? new Date(date).toLocaleDateString() : 'N/A'
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const book = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit book</DropdownMenuItem>
                        <DropdownMenuItem>Delete book</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

