import { Status } from "@prisma/client";
import * as BookModel from "../models/bookModel";
import { Request, Response } from "express";

export const addBook = async (req: Request, res: Response) => {
    const userID = req.user?.id!;

    try {
        const { name, author, status, startDate, finishDate } = req.body;

        if (!name || !author) {
            res.status(400).json({ error: "Missing required fields: name, autor" });
            return;
        }

        // Validate status and dates
        const validationError = validateDates(status, startDate, finishDate);
        if (validationError) {
            res.status(400).json({ error: validationError });
            return;
        }

        const bookData: BookModel.BookData = {
            name,
            author,
            status,
            startDate: new Date(startDate) || null,
            finishDate: new Date(finishDate) || null,
            userID
        };

        const newBook = await BookModel.addBook(bookData);
        res.status(201).json(newBook);
    } catch (error) {
        console.error("Error in addBook controller:", error);
        res.status(500).json({ error: "Failed to add book" });
    }
};

export const updateBook = async (req: Request, res: Response) => {
    const bookID = parseInt(req.params.id, 10);
    const userID = req.user?.id!;

    try {
        const { name, author, status, startDate, finishDate } = req.body;

        // Validate book ID
        if (!bookID) {
            res.status(400).json({ error: "Invalid book ID" });
            return;
        }

        // Validate status and dates
        const validationError = validateDates(status, startDate, finishDate);
        if (validationError) {
            res.status(400).json({ error: validationError });
            return;
        }

        // Build update data object dynamically
        const updateData: Partial<BookModel.BookData> = {};
        if (name) updateData.name = name;
        if (author) updateData.author = author;
        if (status) updateData.status = status;
        if (startDate) updateData.startDate = new Date(startDate);
        if (finishDate) updateData.finishDate = new Date(finishDate);

        // Call model to update the book
        const updatedBook = await BookModel.updateBook(bookID, userID, updateData);
        if (!updatedBook) {
            res.status(404).json({ error: "Book not found or not authorized" });
            return;
        }

        res.status(200).json(updatedBook);
    } catch (error) {
        console.error("Error in updateBook controller:", error);
        res.status(500).json({ error: "Failed to update book" });
    }
};

export const getAllBooks = async (req: Request, res: Response) => {
    console.log("getting all book");
    try {
        const userID = req.user?.id!;
        console.log(userID);

        const books = await BookModel.getAllBooksByUserID(Number(userID));
        console.log(books);
        res.status(200).json(books);
    } catch (error) {
        console.error("Error in deleteBook controller:", error);
        res.status(500).json({ error: "Failed to delete book" });
    }
}


export const deleteBook = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ error: "Missing required field: id" });
            return;
        }

        const deletedBook = await BookModel.deleteBook(Number(id));
        res.status(200).json(deletedBook);
    } catch (error) {
        console.error("Error in deleteBook controller:", error);
        res.status(500).json({ error: "Failed to delete book" });
    }
};


const validateDates = (status: string, startDate?: string, finishDate?: string): string | null => {
    if (!(status === Status.COMPLETED || status === Status.COMPLETED || status === Status.COMPLETED)) {
        return "Invalid book status";
    }

    if (status === Status.COMPLETED) {
        if (!startDate || !finishDate) {
            return "For completed book, start date and finish date must be provided";
        }
    } else if (status === Status.IN_PROGRESS) {
        if (!startDate) {
            return "For in-progress book, start date must be provided";
        }
    }

    // Validate date formats
    if (startDate && isNaN(Date.parse(startDate))) {
        return "Invalid startDate format";
    }

    if (finishDate && isNaN(Date.parse(finishDate))) {
        return "Invalid finishDate format";
    }

    // Ensure finishDate is not earlier than startDate
    if (startDate && finishDate && new Date(finishDate) < new Date(startDate)) {
        return "finishDate cannot be earlier than startDate";
    }

    return null; // No validation errors
};