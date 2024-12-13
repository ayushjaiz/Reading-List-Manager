export const config = {
    jwtSecret: process.env.JWT_SECRET || "your-secret-key",
    jwtExpiresIn: "1h",
    redisUrl: process.env.REDIS_URL,
};
