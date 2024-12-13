import jwt from "jsonwebtoken";
import { config } from "../config/env";

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.jwtSecret);
};
