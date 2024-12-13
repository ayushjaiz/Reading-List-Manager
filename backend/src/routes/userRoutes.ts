import express from "express";
import { authenticate } from "../middlewares/authenticate";
import * as userController from "../controllers/userController";

const router = express.Router();

router.get(
    "/profile",
    authenticate,
    userController.getUserProfile
);

export default router;
