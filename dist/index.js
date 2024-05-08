"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// @ts-ignore
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("./database/models/User"));
const helper_1 = require("./helper/helper");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// Middleware
app.use(express_1.default.urlencoded()); // Parse incoming urlencoded payloads
app.use(express_1.default.json()); // Parse incoming json payloads
app.get("/", (reg, res) => {
    return res.json({ message: "OK" });
});
// Sign in route
app.post("/sign-in", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const validUser = yield User_1.default.authenticate(email, password);
    if (validUser) {
        const userInfo = yield User_1.default.findOne({ where: { email: email } });
        return res.status(200).json({ data: userInfo });
    }
    return res.status(400).json({ message: "User not found" });
}));
// Sign up route
app.post("/sign-up", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { givenName, email, password } = req.body;
    console.log(givenName, email, password);
    try {
        if (helper_1.reg.test(password)) {
            const hashedPassword = yield (0, helper_1.hashPassword)(password);
            const newUser = yield User_1.default.create({
                email: email,
                passwordHash: hashedPassword,
                givenName: givenName,
            });
            return res.json({ message: "OK", data: newUser }).status(200);
        }
        return res.status(400).json({ message: "Password must have at least 1 special character, 1 uppercase letter and 1 number" });
    }
    catch (error) {
        if (error.message === "Error hash password")
            return res.status(500).json({ message: "Error when hash password" });
        console.log(error);
    }
}));
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
