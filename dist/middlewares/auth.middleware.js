"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../utils/env");
exports.default = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const [prefix, accessToken] = token.split(" ");
    if (prefix !== "Bearer" || !accessToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(accessToken, env_1.SECRET);
        // Log untuk debug
        console.log("Decoded token:", decoded);
        req.user = {
            id: decoded.id,
            roles: decoded.roles,
        };
        next();
    }
    catch (error) {
        console.error("JWT verification error:", error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};
