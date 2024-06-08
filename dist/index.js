"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("sequelize");
// @ts-ignore
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("./database/models/User"));
const helper_1 = require("./helper/helper");
const IsLogin_1 = __importDefault(require("./middleware/IsLogin"));
const jwt = __importStar(require("jsonwebtoken"));
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
app.post("/sign-in", async (req, res) => {
    const { email, password } = req.body;
    const validUser = await User_1.default.authenticate(email, password);
    if (validUser) {
        const userInfo = await User_1.default.findOne({ where: { email: email } });
        // @ts-ignore
        res.header("loginToken", userInfo.loginToken);
        return res.status(200).json({ data: userInfo, loginToken: res.getHeader("loginToken") });
    }
    return res.status(400).json({ message: "User not found" });
});
// Sign up route
app.post("/sign-up", async (req, res) => {
    const { givenName, email, password } = req.body;
    try {
        if (helper_1.reg.test(password)) {
            const hashedPassword = await (0, helper_1.hashPassword)(password);
            // @ts-ignore
            const loginToken = jwt.sign({ email: email }, 
            //   @ts-ignore
            process.env.ENV_SECRET_KEY, { expiresIn: "30 days" });
            const newUser = await User_1.default.create({
                email: email,
                passwordHash: hashedPassword,
                givenName: givenName,
                loginToken: loginToken,
            });
            res.header("loginToken", loginToken);
            const newUserReturn = await User_1.default.findOne({
                where: { email: email },
            });
            return res.json({ message: "OK", data: newUserReturn }).status(200);
        }
        else
            return res.status(400).json({
                message: "Password must have at least 1 special character, 1 uppercase letter and 1 number",
            });
    }
    catch (error) {
        if (error.message === "Error hash password")
            return res.status(500).json({ message: "Error when hash password" });
        console.log(error);
    }
});
// CRUD API for Posts
apiPost.use(IsLogin_1.default);
apiPost.post("/get-user", async (req, res) => {
    let userId = req.body.id;
    try {
        let findUser = await User_1.default.findOne({ where: { id: userId } });
        if (findUser)
            return res.status(200).json({ data: findUser });
    }
    catch (error) {
        return res.status(404).json({ message: "Null" });
    }
});
apiPost.get("/", async (req, res) => {
    let email = req.body.user.email;
    let user = await User_1.default.findOne({ where: { email: email } });
    // @ts-ignore
    let userId = user.id;
    let allPost = await User_1.default.getAllPost(userId);
    // @ts-ignore
    let newArray = (0, helper_1.groupArray)(allPost, 3);
    // @ts-ignore
    return res.status(200).json({ post: allPost, groupArray: newArray, user: user });
});
apiPost.get("/friend-posts", async (req, res) => {
    let email = req.body.user.email;
    let userId = await User_1.default.getId(email);
    if (userId === null)
        return res.status(404).json({ message: "Not found" });
    // @ts-ignore
    let friendList = await User_1.default.getPostOfFriends(userId.id);
    // @ts-ignore
    let userList = await User_1.default.getAllPost(userId.id);
    if (userList !== null)
        friendList?.push(...userList);
    if (friendList === null)
        return res.status(404).json({ message: "Not found" });
    return res.status(200).json({ posts: friendList });
});
apiPost.post("/add-post", async (req, res) => {
    let email = req.body.user.email, content = req.body.content, image = req.body.image, isComplete = null;
    let userId = await User_1.default.getId(email);
    if (userId === null) {
        return res.status(404).json({ message: "Authenticate is falied" });
    }
    // @ts-ignore
    await User_1.default.addPost(userId.id, image, content).then((result) => (isComplete = result));
    return res.status(isComplete ? 200 : 400).json({ message: isComplete });
});
apiPost.get("/specific-user/:id", async (req, res) => {
    const id = req.params.id;
    if (!id)
        return res.status(400).json({ message: "ID is empty" });
    try {
        const user = await User_1.default.findOne({ where: { id: id } });
        const allPostForId = await User_1.default.getAllPost(parseInt(id));
        // @ts-ignore
        let newArray = (0, helper_1.groupArray)(allPostForId, 3);
        return res.status(200).json({ groupArray: newArray, user: user });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
// Search users
app.get("/search", IsLogin_1.default, async (req, res) => {
    const query = req.query.query;
    if (query === "")
        return res.status(400).json({ message: "Error" });
    const result = await User_1.default.findAll({
        where: { username: { [sequelize_1.Op.like]: "%" + query + "%" } },
    });
    if (result.length > 0)
        return res.status(200).json({ data: result });
    return res.status(404).json({ data: "User not found" });
});
// Update info of a user
apiPost.patch("/update-user", async (req, res) => {
    const { id, givenName, username, gender, image } = req.body;
    try {
        const update = await User_1.default.update({
            givenName: givenName,
            username: username,
            gender: gender,
            image: image,
        }, { where: { id: id } });
        if (update) {
            const updatedUser = await User_1.default.findOne({ where: { id: id } });
            return res.status(200).json({ user: updatedUser });
        }
        return res.status(400).json({ message: "User not found" });
    }
    catch (error) {
        console.log("Error when update info of a user");
        return res.status(500).json({ message: "Error in server side" });
    }
});
// Toggle one like for specific post
apiPost.post("/toggle-like", async (req, res) => {
    try {
        const { postId, userId } = req.body;
        const isExist = await Post_1.default.isExistLikeInSpecificPost(postId, userId);
        let result;
        if (isExist)
            result = await Post_1.default.removeALike(postId, userId);
        else
            result = await Post_1.default.addALike(postId, userId);
        let quantity = await Post_1.default.getLikeInteractions(postId);
        return res.status(200).json({ data: quantity, isExist: isExist });
    }
    catch (error) {
        console.log("Error when increase one like for specific post: " + error);
        return res.status(500);
    }
});
// Check whether a user like a post or not
apiPost.post("/check-like", async (req, res) => {
    try {
        const { postId, userId } = req.body;
        const isExist = await Post_1.default.isExistLikeInSpecificPost(postId, userId);
        return res.status(200).json({ isExist: isExist });
    }
    catch (error) {
        console.log("Error in check like: " + error);
        return res.status(500);
    }
});
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
