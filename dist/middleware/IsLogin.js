"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function isLogin(req, res, next) {
    const token = req.headers.logintoken;
    console.log(req.headers);
    if (!token)
        return res.status(401).json({ message: "Token is required" });
    // @ts-ignore
    jsonwebtoken_1.default.verify(token, process.env.ENV_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        // @ts-ignore
        req.user = user;
        next();
    });
}
exports.default = isLogin;
