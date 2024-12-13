import prisma from "../prisma/client";

export const createUser = async (email: string, hashedPassword: string, role?: string) => {
    try {
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },

            select: {
                email: true,
                createdAt: true,
            }
        });

        return user;
    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Failed to create user");
    }
};

export const getUserByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        return user;
    } catch (error) {
        console.error("Error retrieving user:", error);
        throw new Error("Failed to retrieve user");
    }
};

export const getUserById = async (id: number) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                email: true,
                createdAt: true,
            }
        });
        return user;
    } catch (error) {
        console.error("Error retrieving user:", error);
        throw new Error("Failed to retrieve user");
    }
};



