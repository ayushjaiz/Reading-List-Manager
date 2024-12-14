import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
      };
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = verifyToken(token)
    req.user = decoded as any; // Attach the decoded user
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};
