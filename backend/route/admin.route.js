// route/admin.route.js
import express from "express";
import adminMiddleware from "../middleware/admin.middleware.js";
import Book from "../model/bookModel.js";
import User from "../model/user.model.js";

const router = express.Router();

// Route to view all users
router.get("/users", adminMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

// Route to add a new book
router.post("/books", adminMiddleware, async (req, res) => {
  const book = new Book(req.body);
  try {
    await book.save();
    res.status(201).send(book);
  } catch (error) {
    res.status(400).send({ error: "Failed to add book" });
  }
});

// Route to get all books
router.get("/books", adminMiddleware, async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

// Route to update a book
router.put("/books/:id", adminMiddleware, async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) {
      return res.status(404).send({ error: "Book not found" });
    }
    res.status(200).send(book);
  } catch (error) {
    res.status(400).send({ error: "Failed to update book" });
  }
});

// Route to delete a book
router.delete("/books/:id", adminMiddleware, async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).send({ error: "Book not found" });
    }
    res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

export default router;
