import express from 'express'
// controller
import { signupUser, loginUser, } from '../controller/user-controller.js';

import { uploadImage, getImage } from '../controller/image-controller.js';
import { createPost,getAllPost } from '../controller/post-controller.js';

import upload from '../utils/upload.js'
import { authenticateToken } from '../controller/jwt-controller.js';
const router = express.Router();


router.post('/signup', signupUser)
router.post('/login', loginUser)

router.post('/file/upload', upload.single('file'), uploadImage)
router.get('/file/:filename', getImage)
router.post('/create', authenticateToken, createPost)

router.get('/posts', authenticateToken,getAllPost)






export default router;