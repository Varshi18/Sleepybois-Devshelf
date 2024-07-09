import express from "express"
import { getBook } from "../controller/book.controller.js"
import Book from '../model/bookModel.js';

const router = express.Router();

router.get("/", getBook);

router.get('/:_id', async (req, res) => {
    try {
        const book = await Book.findById(req.params._id);
        if (!book) {
            console.log('Book not found');
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).json({ error: 'An error occurred while fetching the book' });
    }
});

export default router;