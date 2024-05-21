"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
function isLogin(req, res, next) {
    var token = req.headers.logintoken;
    if (!token)
        return res.status(401).json({ message: "Token is required" });
    // @ts-ignore
    jwt.verify(token, process.env.ENV_SECRET_KEY, function (err, user) {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        // @ts-ignore
        req.body.user = user;
        next();
    });
}
exports.default = isLogin;
