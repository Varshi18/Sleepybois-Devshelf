import express from "express"
import { signup, login } from "../controller/user.controller.js";   //the signup function we created in controller

const router = express.Router()

router.post("/signup", signup);
router.post("/login", login);

export default router;