import express from "express"
import { signup, login, borrowBook, returnBook, getUserDetails, getUser} from "../controller/user.controller.js";  
import { verifyToken } from "../middleware/admin.middleware.js";

const router = express.Router()

router.post("/signup", signup);
router.post("/login", login);
router.post("/borrow/:bookId", borrowBook);
router.post('/returnBook/:bookId', returnBook);
router.get('/user', verifyToken, getUserDetails);
router.post("/userInfo", getUser);

export default router;