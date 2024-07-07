import Book from "../model/bookModel.js";

export const getBook = async(req, res)=>{
    try {
        const book = await Book.find();//async await because data may take time
        res.status(200).json(book);   //result 200 if success
    } catch (error) {
        console.log("error:", error);
        res.status(500).json(error);
    }
};