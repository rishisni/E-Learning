import express from 'express';
import { myProfile, register, verifyUser, loginUser } from '../controllers/user.js';
import { isAuth } from '../middleware/isAuth.js';
import TryCatch from "../middleware/TryCatch.js";

const router = express.Router();

// Registration route
router.post('/register', register);

// Verification route
router.post('/verify', verifyUser);

// Login route
router.post('/login', loginUser);

// Fetching profile route with isAuth middleware
router.get('/profile', isAuth, TryCatch(myProfile));

export default router;
