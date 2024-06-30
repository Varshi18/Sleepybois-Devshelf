import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title:String,
    description:String,
    author:String,
    genre:String,
    department:String,
    count:Number,

})
const Book = mongoose.model("Book", bookSchema);

export default Book;