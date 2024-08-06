import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../utils/env";
import { IReqUser } from "../utils/interfaces";

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const [prefix, accessToken] = token.split(" ");

  if (prefix !== "Bearer" || !accessToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(accessToken, SECRET) as {
      id: string;
      roles: string[];
    };

    // Log untuk debug
    console.log("Decoded token:", decoded);

    (req as IReqUser).user = {
      id: decoded.id,
      roles: decoded.roles,
    };

    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
