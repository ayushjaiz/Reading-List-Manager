import { Status } from "@prisma/client";
import prisma from "../prisma/client";

export interface BookData {
    id?: number;
    name: string;
    author: string;
    status?: Status;
    startDate?: Date;
    finishDate?: Date;
    userID: number;
    createdAt?: Date;
}

export const getBookDetailsByBookID = async (id: number) => {
    try {
        const book = await prisma.book.findUnique({
            where: { id }
        })
        return book
    } catch (error) {
        console.error('Error getting book details:', error);
        throw new Error('Failed to get book details');
    }
}

export const getAllBooksByUserID = async (userID: number) => {
    try {
        const books = await prisma.book.findMany({
            where: { userID }
        })
        return books
    } catch (error) {
        console.error('Error getting book details:', error);
        throw new Error('Failed to get book details');
    }
}

export const addBook = async (bookData: BookData) => {
    console.log(bookData);
    try {
        const newBook = await prisma.book.create({
            data: bookData,
            select: {
                id: true,
                name: true,
                author: true,
                status: true,
            }
        });
        return newBook;
    } catch (error) {
        console.error('Error adding book:', error);
        throw new Error('Failed to add book');
    }
};

export const updateBook = async (
    bookID: number,
    userID: number,
    updateData: Partial<BookData>
) => {
    try {
        // Ensure the book belongs to the user
        const existingBook = await prisma.book.findFirst({
            where: {
                id: bookID,
                userID: userID,
            },
        });

        if (!existingBook) {
            return null; // Return null if the book is not found or doesn't belong to the user
        }

        // Update the book with the provided fields
        const updatedBook = await prisma.book.update({
            where: { id: bookID },
            data: updateData,
        });

        return updatedBook;
    } catch (error) {
        console.error("Error updating book:", error);
        throw new Error("Failed to update book");
    }
};

export const deleteBook = async (id: number) => {
    try {
        const deletedBook = await prisma.book.delete({
            where: { id },
            select: {
                name: true,
                author: true,
            }
        });
        return deletedBook;
    } catch (error) {
        console.error('Error deleting book:', error);
        throw new Error('Failed to delete book');
    }
};

export const getAnalytics = async (userID: number) => {
    try {
        // Total books read
        const totalBooksRead = await prisma.book.count({
            where: { status: Status.COMPLETED, userID },
        });

        // Reading progress over time
        const readingProgress = await prisma.book.findMany({
            where: {
                OR: [
                    { status: Status.IN_PROGRESS },
                    { status: Status.COMPLETED },
                ],
            },
            select: {
                startDate: true,
                finishDate: true,
                name: true,
                status: true,
            },
        });

        // Average reading completion rate
        const totalBooks = await prisma.book.count();
        const completionRate = totalBooks > 0 ? (totalBooksRead / totalBooks) * 100 : 0;

        return {
            totalBooksRead,
            readingProgress,
            completionRate,
        };
    } catch (error) {
        console.error('Error fetching analytics data:', error);
        throw new Error('Failed to fetch analytics data');
    }
};

