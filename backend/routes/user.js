import express from "express";
import { postUserSignUp, postUserSignin } from "../controllers/user.js";
const router = express.Router();

router.post("/signup", postUserSignUp);
router.post("/signin", postUserSignin);

export default router;