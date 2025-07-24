import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { signup, login, logout, updateProfile, checkAuth } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/profile-update", protectRoute, updateProfile);//.put is used for updating user profile

router.get("/check", protectRoute, checkAuth); // Check if the user is authenticated
export default router;
