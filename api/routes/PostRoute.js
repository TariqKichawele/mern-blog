import express from 'express';
import { verifyToken } from '../utils/VerifyUser.js';
import { create, getposts } from '../controllers/PostController.js';

const router = express.Router();

router.post('/create', verifyToken, create)
router.get('/getpost', getposts);
export default router;