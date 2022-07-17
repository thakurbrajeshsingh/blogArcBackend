import express from 'express'
// controller
import { signupUser, loginUser, } from '../controller/user-controller.js';

import { uploadImage, getImage } from '../controller/image-controller.js';
import { createPost, getAllPost, getPost, updatePost, deletePost } from '../controller/post-controller.js';
import { newComment ,getComments} from '../controller/comment-controller.js'
import upload from '../utils/upload.js'
import { authenticateToken } from '../controller/jwt-controller.js';
const router = express.Router();


router.post('/signup', signupUser)
router.post('/login', loginUser)

router.post('/file/upload', upload.single('file'), uploadImage)
router.get('/file/:filename', getImage)
router.post('/create', authenticateToken, createPost)

router.get('/posts', authenticateToken, getAllPost)
router.get('/post/:id', authenticateToken, getPost)
router.put('/update/:id', authenticateToken, updatePost)
router.delete('/delete/:id', authenticateToken, deletePost)
router.post('/comment/new', authenticateToken, newComment);
router.get('/comments/:id', authenticateToken, getComments);



export default router;