import express from "express";

import { addBook, updateBook, deleteBook, getAllBooks } from "../controllers/bookController";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

router.get("/", authenticate, getAllBooks)
router.post("/add", authenticate, addBook);
router.put("/:id", authenticate, updateBook);
router.delete("/:id", authenticate, deleteBook);

export default router;
