import { Router } from "express";
import {
    getAllBooks,
    addBook,
    updateBook,
    deleteBook,
    borrowBook,
    returnBook,
    getRecommendations,
} from "../controllers/bookController";

const router: Router = Router();

/**
 * Routes for book management.
 * Base URL: /api/v1/books
 */

// Get a list of all books
router.get("/", getAllBooks);

// Add a new book to the library
router.post("/", addBook);

// Update details of a specific book
router.put("/:id", updateBook);

// Delete a book by ID
router.delete("/:id", deleteBook);

// Borrow a specific book
router.post("/:id/borrow", borrowBook);

// Return a borrowed book
router.post("/:id/return", returnBook);

// Get book recommendations
router.get("/recommendations", getRecommendations);

export default router;
