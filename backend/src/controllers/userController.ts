import { Request, Response } from "express";
import { getUserById } from "../models/UserModel";

export const getUserProfile = async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        res.status(400).json({ message: "Invalid token, user ID missing" });
        return;
    }

    try {
        const user = await getUserById(userId)

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({
            message: "User Profile",
            user,
        });
        return;

    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};
