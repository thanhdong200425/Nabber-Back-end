import express, { Request, Response } from "express";
import { Op } from "sequelize";
// @ts-ignore
import dotenv from "dotenv";
import User from "./database/models/User";
import { groupArray, hashPassword, reg } from "./helper/helper";
import isLogin from "./middleware/IsLogin";
import * as jwt from "jsonwebtoken";
import Post from "./database/models/Post";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Notification from "./database/models/Notification";

dotenv.config();
const app = express();
const port = process.env.PORT;
const apiPost = express.Router();
const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
        return res.status(200).json({ data: userInfo, loginToken: res.getHeader("loginToken") });
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
                message: "Password must have at least 1 special character, 1 uppercase letter and 1 number",
            });
    } catch (error: any) {
        if (error.message === "Error hash password") return res.status(500).json({ message: "Error when hash password" });
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
    let allPost = await User.getAllPost(userId);
    // @ts-ignore
    let newArray = groupArray(allPost, 3);

    // @ts-ignore
    return res.status(200).json({ post: allPost, groupArray: newArray, user: user });
});

apiPost.get("/friend-posts", async (req: Request, res: Response) => {
    let email = req.body.user.email;
    let userId = await User.getId(email);
    if (userId === null) return res.status(404).json({ message: "Not found" });
    // @ts-ignore
    let friendList = await User.getPostOfFriends(userId.id);
    // @ts-ignore
    let userList = await User.getAllPost(userId.id);
    if (userList !== null) friendList?.push(...userList);
    if (friendList === null) return res.status(404).json({ message: "Not found" });
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
    await User.addPost(userId.id, image, content).then((result) => (isComplete = result));
    return res.status(isComplete ? 200 : 400).json({ message: isComplete });
});

apiPost.get("/specific-user/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "ID is empty" });
    try {
        const user = await User.findOne({ where: { id: id } });
        const allPostForId = await User.getAllPost(parseInt(id));
        // @ts-ignore
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

// Toggle one like for specific post
apiPost.post("/toggle-like", async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const { postId, userId } = req.body;
        const isExist = await Post.isExistLikeInSpecificPost(postId, userId);
        let result;
        if (isExist) result = await Post.removeALike(postId, userId);
        else {
            result = await Post.addALike(postId, userId);
            const senderInfo = await User.findOne({
                where: {
                    id: userId,
                },
            });
            const ownPostInfo = await Post.findOne({ where: { id: postId } });
            const isExisting = await Notification.findAll({
                where: {
                    senderId: userId,
                    // @ts-ignore
                    receiverId: ownPostInfo?.userId,
                    postId: postId,
                },
            });
            if (isExisting.length === 0)
                await Notification.create({
                    senderId: userId,
                    // @ts-ignore
                    receiverId: ownPostInfo?.userId,
                    notificationTypeId: 1,
                    postId: postId,
                    content: `liked your post`,
                    // @ts-ignore
                    imageUrl: ownPostInfo.image,
                });
        }
        let quantity = await Post.getLikeInteractions(postId);
        return res.status(200).json({ data: quantity, isExist: isExist });
    } catch (error) {
        console.log("Error when increase one like for specific post: " + error);
        return res.status(500);
    }
});

// Check whether a user like a post or not
apiPost.post("/check-like", async (req: Request, res: Response) => {
    try {
        const { postId, userId } = req.body;
        const isExist = await Post.isExistLikeInSpecificPost(postId, userId);
        return res.status(200).json({ isExist: isExist });
    } catch (error) {
        console.log("Error in check like: " + error);
        return res.status(500);
    }
});

// Get like quantity of a post
apiPost.post("/get-like", async (req: Request, res: Response) => {
    try {
        const { postId } = req.body;
        const quantity = await Post.getLikeInteractions(postId);
        return res.status(200).json({ data: quantity });
    } catch (error) {
        console.log("Error when get like quantity of a post: " + error);
        return res.status(500);
    }
});

// Get all the comment of a post
apiPost.post("/get-comment", async (req: Request, res: Response) => {
    try {
        const { postId } = req.body;
        const allTheComments = await Post.getAllComments(postId);
        return res.status(200).json({ data: allTheComments });
    } catch (error) {
        console.log("Error when get all the comment of a post: " + error);
        return res.status(500);
    }
});

// Add a comment to the specific post
apiPost.post("/add-comment", async (req: Request, res: Response) => {
    try {
        const { userId, postId, content } = req.body;
        // @ts-ignore
        const isCompleted = await Post.addAComment(userId, postId, content);
        if (isCompleted) {
            const ownPostInfo = await Post.findOne({ where: { id: postId } });
            await Notification.create({
                senderId: userId,
                postId: postId,
                notificationTypeId: 2,
                content: "commented on your post",
                // @ts-ignore
                receiverId: ownPostInfo?.userId,
                // @ts-ignore
                imageUrl: ownPostInfo?.image,
            });
            return res.status(200).json({ data: true });
        } else return res.status(400).json({ data: false });
    } catch (error) {
        console.log("Error when add a comment to a post: " + error);
        return res.status(500);
    }
});

apiPost.post("/get-summary-comment", async (req: Request, res: Response) => {
    try {
        const { postId } = req.body;
        const allTheComments = await Post.getAllComments(postId);
        let dataToPrompt = [];
        // @ts-ignore
        dataToPrompt = allTheComments
            ?.map((comment) => {
                return {
                    // @ts-ignore
                    content: comment.content,
                    // @ts-ignore
                    username: comment.username,
                };
            })
            .map((comment) => `Content: ${comment.content}, Username: ${comment.username}`)
            .join("\n");

        const prompt = "GIVE ME A SUMMARY COMMENT BASED ON THIS: \n" + dataToPrompt;
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        return res.status(200).json({ data: text });
    } catch (error) {
        console.log("Error when get summary comment: " + error);
        return res.status(500);
    }
});

// Fetch all the notifications
apiPost.post("/get-all-notifications", async (req: Request, res: Response) => {
    try {
        const { receiverId } = req.body;
        const result = await Notification.getAll(receiverId);
        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("Error when fetch all the notifications: " + error);
        return res.status(500);
    }
});

// Check whether a notification is exisiting
apiPost.post("/is-existing-notification", async (req: Request, res: Response) => {
    try {
        const { senderId, receiverId, postId } = req.body;
        const result = await Notification.findOne({
            where: {
                senderId: senderId,
                receiverId: receiverId,
                postId: postId,
            },
        });
        let returnValue = false;
        if (result !== null) returnValue = true;

        return res.status(200).json({ data: returnValue });
    } catch (error) {
        console.log("Error in check whether a notification is existing: " + error);
        return res.status(500);
    }
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
