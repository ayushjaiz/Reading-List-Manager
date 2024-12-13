import express from "express";
import { register, login, logout } from "../controllers/authController";
import { rateLimiter } from "../middlewares/rateLimiter";

const router = express.Router();

router.post("/register", rateLimiter({ windowInSeconds: 60, maxRequests: 10 }), register);
router.post("/login", rateLimiter({ windowInSeconds: 60, maxRequests: 5 }), login);
router.post("/logout", logout);

export default router;
