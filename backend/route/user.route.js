import express from "express"
import { signup, login, borrowBook, returnBook} from "../controller/user.controller.js";   //the signup function we created in controller

const router = express.Router()

router.post("/signup", signup);
router.post("/login", login);
router.post("/borrow/:bookId", borrowBook);
router.post('/returnBook/:bookId', returnBook);


export default router;