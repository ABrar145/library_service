import { Book } from "../models/bookModel";

// In-memory book collection (for demo purposes)
const books: Book[] = [
    {
        id: "1",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        isBorrowed: false,
    },
    {
        id: "2",
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        isBorrowed: false,
    },
    {
        id: "3",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Classic",
        isBorrowed: false,
    },
];
// Finds a book by its ID
export const findById = (id: string): Book | undefined => {
    return books.find((book) => book.id === id);
};
/**
 * Fetches all books in the library.
 * @returns {Book[]} Array of all books
 */
export const getAllBooks = (): Book[] => {
    return books;
};

/**
 * Adds a new book to the library system.
 * @param bookData - Book data excluding fields that are auto-generated (id, isBorrowed)
 * @returns {Book} Newly created book with auto-generated ID and isBorrowed set to false
 */
export const addBook = (
    bookData: Omit<Book, "id" | "isBorrowed" | "borrowerId" | "dueDate">
): Book => {
    // Validate required fields
    if (!bookData.title || !bookData.author || !bookData.genre) {
        throw new Error("Missing required fields: title, author, and genre are required");
    }

    const newBook: Book = {
        id: (Math.random() * 10000).toFixed(0), // Generate a random ID for the book
        title: bookData.title,
        author: bookData.author,
        genre: bookData.genre,
        isBorrowed: false, // New books start as not borrowed
    };

    books.push(newBook); // Add the new book to the books array
    return newBook;
};

/**
 * Updates an existing book's information.
 * @param id - The ID of the book to update
 * @param bookData - Partial update for the book
 * @returns {Book} Updated book
 * @throws {Error} When the book with the given ID is not found
 */
export const updateBook = (id: string, bookData: Partial<Book>): Book => {
    const book = books.find((b) => b.id === id);

    if (!book) {
        throw new Error(`Book with ID ${id} not found`); // Book not found
    }

    // Clean up book data (remove protected fields)
    const safeUpdate = { ...bookData };
    delete safeUpdate.id; // Prevent updating ID
    delete safeUpdate.isBorrowed; // Prevent changing borrow status
    delete safeUpdate.borrowerId; // Prevent altering borrower info
    delete safeUpdate.dueDate; // Prevent modifying due date

    // Update book information
    Object.assign(book, safeUpdate);
    return book;
};

/**
 * Removes a book from the library system.
 * @param id - The ID of the book to delete
 * @returns {boolean} True if book was deleted, false if not found
 */
export const deleteBook = (id: string): boolean => {
    const index = books.findIndex((b) => b.id === id);
    if (index === -1) return false; // Book not found

    books.splice(index, 1); // Remove book from the array
    return true;
};

/**
 * Marks a book as borrowed by a user.
 * @param id - The ID of the book to borrow
 * @param borrowerId - The ID of the borrower
 * @returns {Book | null} The updated book if borrowed, or null if not available
 */
export const borrowBook = (id: string, borrowerId: string): Book | null => {
    const book = books.find((b) => b.id === id);

    if (!book || book.isBorrowed) {
        return null; // Book not found or already borrowed
    }

    book.isBorrowed = true; // Mark the book as borrowed
    book.borrowerId = borrowerId; // Assign the borrower ID
    book.dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // Set due date to 7 days from now
    return book;
};

/**
 * Marks a book as returned, removing borrower information and due date.
 * @param id - The ID of the book to return
 * @returns {Book | null} The updated book, or null if it wasn't borrowed
 */
export const returnBook = (id: string): Book | null => {
    const book = books.find((b) => b.id === id);

    if (!book || !book.isBorrowed) {
        return null; // Book not found or not borrowed
    }

    book.isBorrowed = false; // Mark the book as not borrowed
    delete book.borrowerId; // Remove borrower ID
    delete book.dueDate; // Remove due date
    return book;
};

/**
 * Gets a list of recommended books (up to 3) that are available for borrowing.
 * @returns {Book[]} Array of recommended books
 */
export const getRecommendations = (): Book[] => {
    return books.filter((b) => !b.isBorrowed).slice(0, 3); // Return first 3 available books
};
