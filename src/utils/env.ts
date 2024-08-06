import dotenv from "dotenv";

dotenv.config();

// console.log("DATABASE_URL:", process.env.DATABASE_URL); // Debug log
// console.log("SECRET:", process.env.SECRET); // Debug log

export const DATABASE_URL: string = process.env.DATABASE_URL || "";
export const SECRET: string = process.env.SECRET || "secret";
