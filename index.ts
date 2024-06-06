import express, { Request, Response } from "express";
import { Op } from "sequelize";
// @ts-ignore
import dotenv from "dotenv";
import User from "./database/models/User";
import { groupArray, hashPassword, reg } from "./helper/helper";
import isLogin from "./middleware/IsLogin";
import * as jwt from "jsonwebtoken";
import Post from "./database/models/Post";

dotenv.config();
const app = express();
const port = process.env.PORT;
const apiPost = express.Router();

// Middleware
app.use(express.urlencoded()); // Parse incoming urlencoded payloads
app.use(express.json()); // Parse incoming json payloads
app.use("/post", apiPost); // Mount a module that will be handled with "/post" prefix

app.get("/", (reg: Request, res: Response) => {
    return res.json({ message: "OK" });
});

// Sign in route
app.post("/sign-in", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const validUser = await User.authenticate(email, password);
    if (validUser) {
        const userInfo = await User.findOne({ where: { email: email } });
        // @ts-ignore
        res.header("loginToken", userInfo.loginToken);
        return res
            .status(200)
            .json({ data: userInfo, loginToken: res.getHeader("loginToken") });
    }

    return res.status(400).json({ message: "User not found" });
});

// Sign up route
app.post("/sign-up", async (req: Request, res: Response) => {
    const { givenName, email, password } = req.body;
    try {
        if (reg.test(password)) {
            const hashedPassword = await hashPassword(password);
            // @ts-ignore
            const loginToken = jwt.sign(
                { email: email },
                //   @ts-ignore
                process.env.ENV_SECRET_KEY,
                { expiresIn: "30 days" }
            );
            const newUser = await User.create({
                email: email,
                passwordHash: hashedPassword,
                givenName: givenName,
                loginToken: loginToken,
            });

            res.header("loginToken", loginToken);
            const newUserReturn = await User.findOne({
                where: { email: email },
            });
            return res.json({ message: "OK", data: newUserReturn }).status(200);
        } else
            return res.status(400).json({
                message:
                    "Password must have at least 1 special character, 1 uppercase letter and 1 number",
            });
    } catch (error: any) {
        if (error.message === "Error hash password")
            return res
                .status(500)
                .json({ message: "Error when hash password" });
        console.log(error);
    }
});

// CRUD API for Posts
apiPost.use(isLogin);

apiPost.post("/get-user", async (req: Request, res: Response) => {
    let userId = req.body.id;
    try {
        let findUser = await User.findOne({ where: { id: userId } });
        if (findUser) return res.status(200).json({ data: findUser });
    } catch (error) {
        return res.status(404).json({ message: "Null" });
    }
});

apiPost.get("/", async (req: Request, res: Response) => {
    let email = req.body.user.email;
    let user = await User.findOne({ where: { email: email } });
    // @ts-ignore
    let userId = user.id;
    let allPost = await Post.findAll({ where: { userId: userId } });
    let newArray = groupArray(allPost, 3);

    // @ts-ignore
    return res
        .status(200)
        .json({ post: allPost, groupArray: newArray, user: user });
});

apiPost.get("/friend-posts", async (req: Request, res: Response) => {
    let email = req.body.user.email;
    let userId = await User.getId(email);
    if (userId === null) return res.status(404).json({ message: "Not found" });
    // @ts-ignore (Get post of friends)
    let friendList = await User.getPostOfFriends(userId.id);
    // @ts-ignore
    let userList = await User.getAllPost(userId.id);
    if (userList !== null) friendList?.push(...userList);
    if (friendList === null)
        return res.status(404).json({ message: "Not found" });
    return res.status(200).json({ posts: friendList });
});

apiPost.post("/add-post", async (req: Request, res: Response) => {
    let email = req.body.user.email,
        content = req.body.content,
        image = req.body.image,
        isComplete = null;
    let userId = await User.getId(email);
    if (userId === null) {
        return res.status(404).json({ message: "Authenticate is falied" });
    }
    // @ts-ignore
    await User.addPost(userId.id, image, content).then(
        (result) => (isComplete = result)
    );
    return res.status(isComplete ? 200 : 400).json({ message: isComplete });
});

apiPost.get("/specific-user/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "ID is empty" });
    try {
        const user = await User.findOne({ where: { id: id } });
        const allPostForId = await Post.findAll({ where: { userId: id } });
        let newArray = groupArray(allPostForId, 3);
        return res.status(200).json({ groupArray: newArray, user: user });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
});

// Search users
app.get("/search", isLogin, async (req: Request, res: Response) => {
    const query = req.query.query;
    if (query === "") return res.status(400).json({ message: "Error" });
    const result = await User.findAll({
        where: { username: { [Op.like]: "%" + query + "%" } },
    });
    if (result.length > 0) return res.status(200).json({ data: result });
    return res.status(404).json({ data: "User not found" });
});

// Update info of a user
apiPost.patch("/update-user", async (req: Request, res: Response) => {
    const { id, givenName, username, gender, image } = req.body;
    try {
        const update = await User.update(
            {
                givenName: givenName,
                username: username,
                gender: gender,
                image: image,
            },
            { where: { id: id } }
        );
        if (update) {
            const updatedUser = await User.findOne({ where: { id: id } });
            return res.status(200).json({ user: updatedUser });
        }
        return res.status(400).json({ message: "User not found" });
    } catch (error) {
        console.log("Error when update info of a user");
        return res.status(500).json({ message: "Error in server side" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
