import {chatResponse} from "../controllers/chat.js";
import express from 'express';
const router = express.Router();

router.post('/', chatResponse);

export default router;