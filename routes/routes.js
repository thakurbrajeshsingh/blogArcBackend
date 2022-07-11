import express from 'express'
// controller
import { signupUser } from '../controller/user-controller.js';



const router = express.Router();


router.post('/signup', signupUser)


export default router;