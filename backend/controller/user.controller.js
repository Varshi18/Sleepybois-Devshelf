import User from "../model/user.model.js"; //this will be the new user database
import Book from "../model/bookModel.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      if (!user.password) {
        // User exists but password is empty
        const hashPassword = await bcryptjs.hash(password, 8);
        user.password = hashPassword;
        await user.save();
        return res.status(200).json({
          message: "Password set successfully",
          user: { _id: user._id, email: user.email },
        });
      }
      return res.status(400).json({ message: "User already exists" });
    } else {
      return res.status(401).json({ message: "Not Authorized" });
    }
  } catch (error) {
    console.log("error:", +error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isMatch = await bcryptjs.compare(password, user.password); //the user.password is from the database which is compared with the input password
    if (!user || !isMatch) {
      //check if user.password is empty here
      return res.status(400).json({ message: "Invalid username or Password" });
    } else {
      res.status(200).json({
        message: "Login successful",
        user: {
          _id: user._id, //can use this ID for checking cart
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.log("error:", +error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


//book issuing part

export const borrowBook = async (req, res) => {
  const { bookId } = req.params
  const { userId } = req.body;
  const user = await User.findOne({ _id: userId });
  const book = await Book.findOne({ _id: bookId });
  if (book.count <= 0) {
    return res.status(404).json({ message: "No available copies to borrow" });
  }
  const d = new Date();
  var y = d.toDateString();
  if (user) {
    if (user.book1 === "") {
      user.book1 = bookId;
      user.book1Date = y;
      book.count -= 1;
      await book.save();
      await user.save();
      return res.status(202).json({
        message: "Book1 issued successfully", user: {_id: user._id, email: user.email, book1: user.book1, book2: user.book2, book3: user.book3 },
      });
    } else if (user.book2 === "") {
      user.book2 = bookId;
      user.book2Date = y;
      book.count -= 1;
      await book.save();
      await user.save();
      return res.status(202).json({
        message: "Book2 issued successfully", user: { _id: user._id, email: user.email, book1: user.book1, book2: user.book2, book3: user.book3 },
      });
    } else if (user.book3 === "") {
      user.book3 = bookId;
      user.book3Date = y;
      book.count -= 1;
      await book.save();
      await user.save();
      return res.status(202).json({
        message: "Book3 issued successfully", user: { _id: user._id, email: user.email, book1: user.book1, book2: user.book2, book3: user.book3 },
      });
    } else {
      return res
        .status(404)
        .json({ message: "Maximum limit reached for issuing" });
    }
  } else {
    return res.status(403).json({ message: "Nahi chala" });
  }
};





//book returning part

export const returnBook = async (req, res) => {
  try {
    const { userId } = req.body;
    const { bookId } = req.params;
    const user = await User.findOne({ _id: userId });
    const book = await Book.findOne({ _id: bookId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.book1 === bookId) {
      user.book1 = "";
      user.book1Date = "";
      book.count += 1;
    } else if (user.book2 === bookId) {
      user.book2 = "";
      user.book2Date = "";
      book.count += 1;
    } else if (user.book3 === bookId) {
      user.book3 = "";
      user.book3Date = "";
      book.count += 1;
    } else {
      return res.status(404).json({ message: "Book not found in user's records" });
    }
    await book.save();
    await user.save();

    return res.status(200).json({
      message: "Book returned successfully",
      user: {
        _id: user._id,
        email: user.email,
        book1: user.book1,
        book2: user.book2,
        book3: user.book3,
      },
    });
  } catch (error) {
    console.log("error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};