import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Book from "../model/bookModel.js";
import express from "express"
import bodyParser from "body-parser";
import nodemailer from "nodemailer"
import { scheduleJob } from "node-schedule";
import dotenv from "dotenv"




dotenv.config();


const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


const sendEmail = (to, subject, text) => {
  const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
  };

  console.log('Attempting to send email to:', to);

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error('Error sending email:', error);
      } else {
          console.log('Email sent:', info.response);
      }
  });
};



export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && !user.password) {
      // User exists but password is empty
      const hashPassword = await bcryptjs.hash(password, 8);
      user.password = hashPassword;
      await user.save();
      return res.status(200).json({
        message: "Password set successfully",
        user: { _id: user._id, email: user.email, role: user.role },
      });
    }

    return res.status(400).json({ message: "User already exists or not authorized" });
  } catch (error) {
    console.log("error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await bcryptjs.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        email: user.email,
        token: token,
        role: user.role,
        username: user.username
      }
    });
  } catch (error) {
    console.log("error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};



//book issuing part

export const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { userId } = req.body;
    const user = await User.findOne({ _id: userId });
    const book = await Book.findOne({ _id: bookId });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (book.count <= 0) {
      res.status(404).json({ message: "No available copies to borrow" });
      return;
    }

    const currentDate = new Date().toDateString();

    if (user.book1 === "") {
      user.book1 = bookId;
      user.book1Date = currentDate;
    } else if (user.book2 === "") {
      user.book2 = bookId;
      user.book2Date = currentDate;
    } else if (user.book3 === "") {
      user.book3 = bookId;
      user.book3Date = currentDate;
    } else {
      res.status(404).json({ message: "Maximum limit reached for issuing" });
      return;
    }

    book.count -= 1;
    await book.save();
    await user.save();

    res.status(202).json({
      message: `Book${user.book3 === "" ? user.book2 === "" ? 2 : 1 : 3} issued successfully`,
      user: {
        _id: user._id,
        email: user.email,
        book1: user.book1,
        book2: user.book2,
        book3: user.book3,
      },
    });

    const email = user.email;
    const bookTitle = book.title;

    console.log('Received borrow request with email:', email, 'and book title:', bookTitle);

    const borrowDate = new Date();
    const returnDate = new Date(borrowDate);
    returnDate.setDate(returnDate.getDate() + 15);

    const borrowMessage = `Thank you for issuing the book "${bookTitle}". Please return it by ${returnDate.toDateString()}.`;
    sendEmail(email, 'Book Borrowed from Library', borrowMessage);

    scheduleJob(returnDate, () => {
      const reminderMessage = `This is a reminder to return the book "${bookTitle}". The due date was ${returnDate.toDateString()}.`;
      sendEmail(email, 'Return Book Reminder', reminderMessage);
    });

    const returnReminderDate = new Date(borrowDate.getTime() + 2 * 60 * 1000);
    scheduleJob(returnReminderDate, () => {
      const reminderMessage = `Friendly reminder: Please return the book "${bookTitle}" soon.`;
      sendEmail(email, 'Return Book Reminder', reminderMessage);
    });

  } catch (error) {
    console.log("error:", error.message);
    res.status(500).json({ message: "Internal server error" });
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
export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUser = async(req, res)=>{
  try {
    const { userId } = req.body;
    const user = await User.findOne({ _id: userId });
      res.status(200).json(user);
  } catch (error) {
      console.log("error:", error);
      res.status(500).json(error);
  }
};
