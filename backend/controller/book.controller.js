import Book from "../model/bookModel.js";
export const getBook = async(req, res)=>{
    try {
        const book = await Book.find();
        res.status(200).json(book);
    } catch (error) {
        console.log("error:", error);
        res.status(500).json(error);
    }
};


export const searchBook = async (req, res) => {
    try {
        const { keyword } = req.params;
        const books = await Book.find({
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { author: { $regex: keyword, $options: "i" } }
            ]
        });

        const formattedBooks = books.map(book => ({
            _id: book._id,
            title: book.title,
            author: book.author,
            description: book.description,
            image: book.image,
            matchType: getMatchType(book, keyword)
        }));

        res.json(formattedBooks);
    } catch (error) {
        console.error('Error searching books:', error);
        res.status(500).json({ error: 'An error occurred while searching for books' });
    }
};

// Helper function to determine match type
const getMatchType = (book, keyword) => {
    if (book.title.toLowerCase().includes(keyword.toLowerCase())) {
        return "Title";
    } else if (book.description.toLowerCase().includes(keyword.toLowerCase())) {
        return "Description";
    } else if (book.author.toLowerCase().includes(keyword.toLowerCase())) {
        return "Author";
    } else {
        return "Unknown";
    }
};

export const bookInfo = async (req, res) => {
    try {
        const { bookId } = req.body;  // Extract bookId from request body
        if (!bookId) {
            return res.status(400).json({ error: "Book ID is required" });
        }
        const bookinfo = await Book.findOne({ _id: bookId });
        if (!bookinfo) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.status(200).json(bookinfo);
    } catch (error) {
        console.log("error:", error);
        res.status(500).json(error);
    }
}; 