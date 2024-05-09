import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function isLogin(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.logintoken;
    console.log(token);

    if (!token) return res.status(401).json({ message: "Token is required" });

    // @ts-ignore
    jwt.verify(token, process.env.ENV_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }

        // @ts-ignore
        req.user = user;
        next();
    });
}
