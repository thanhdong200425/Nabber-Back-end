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
const IsLogin_1 = __importDefault(require("./middleware/IsLogin"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Post_1 = __importDefault(require("./database/models/Post"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const apiPost = express_1.default.Router();
// Middleware
app.use(express_1.default.urlencoded()); // Parse incoming urlencoded payloads
app.use(express_1.default.json()); // Parse incoming json payloads
app.use("/post", apiPost); // Mount a module that will be handled with "/post" prefix
app.get("/", (reg, res) => {
    return res.json({ message: "OK" });
});
// Sign in route
app.post("/sign-in", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const validUser = yield User_1.default.authenticate(email, password);
    if (validUser) {
        const userInfo = yield User_1.default.findOne({ where: { email: email } });
        // @ts-ignore
        res.header("loginToken", userInfo.loginToken);
        return res.status(200).json({ data: userInfo, loginToken: res.getHeader("loginToken") });
    }
    return res.status(400).json({ message: "User not found" });
}));
// Sign up route
app.post("/sign-up", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { givenName, email, password } = req.body;
    try {
        if (helper_1.reg.test(password)) {
            const hashedPassword = yield (0, helper_1.hashPassword)(password);
            // @ts-ignore
            const loginToken = jsonwebtoken_1.default.sign({ email: email }, process.env.ENV_SECRET_KEY, { expiresIn: "30 days" });
            const newUser = yield User_1.default.create({
                email: email,
                passwordHash: hashedPassword,
                givenName: givenName,
                loginToken: loginToken,
            });
            res.header("loginToken", loginToken);
            const newUserReturn = yield User_1.default.findOne({ where: { email: email } });
            return res.json({ message: "OK", data: newUserReturn }).status(200);
        }
        return res.status(400).json({ message: "Password must have at least 1 special character, 1 uppercase letter and 1 number" });
    }
    catch (error) {
        if (error.message === "Error hash password")
            return res.status(500).json({ message: "Error when hash password" });
        console.log(error);
    }
}));
// CRUD API for Posts
apiPost.use(IsLogin_1.default);
apiPost.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    let email = req.user.email;
    let user = yield User_1.default.findOne({ where: { email: email } });
    // @ts-ignore
    let userId = user.id;
    let allPost = yield Post_1.default.findAll({ where: { userId: userId } });
    let newArray = (0, helper_1.groupArray)(allPost, 3);
    // @ts-ignore
    return res.status(200).json({ post: allPost, groupArray: newArray });
}));
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
