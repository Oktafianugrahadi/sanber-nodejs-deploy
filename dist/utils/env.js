"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET = exports.DATABASE_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// console.log("DATABASE_URL:", process.env.DATABASE_URL); // Debug log
// console.log("SECRET:", process.env.SECRET); // Debug log
exports.DATABASE_URL = process.env.DATABASE_URL || "";
exports.SECRET = process.env.SECRET || "secret";
