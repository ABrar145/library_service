import * as bookService from "../services/bookService";

describe("Book Service", () => {
    it("should retrieve all books", () => {
        const books = bookService.getAllBooks();
        expect(books.length).toBeGreaterThan(0);
    });

    it("should add a new book", () => {
        const newBook = bookService.addBook({
            title: "New Book",
            author: "Author",
            genre: "Genre",
        });

        expect(newBook).toHaveProperty("id");
        expect(newBook.isBorrowed).toBe(false);
    });

    it("should delete a book", () => {
        const result = bookService.deleteBook("1");
        expect(result).toBe(true);
    });

    it("should borrow a book", () => {
        const book = bookService.borrowBook("2", "12345");
        expect(book).not.toBeNull();
        expect(book?.isBorrowed).toBe(true);
    });

    it("should return a book", () => {
        const book = bookService.returnBook("2");
        expect(book).not.toBeNull();
        expect(book?.isBorrowed).toBe(false);
    });

    it("should get recommendations", () => {
        const recommendations = bookService.getRecommendations();
        expect(recommendations.length).toBeLessThanOrEqual(3);
    });
});
