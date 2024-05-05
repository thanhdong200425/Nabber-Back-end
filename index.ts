import express, { Request, Response } from "express";
// @ts-ignore
import dotenv from "dotenv";
import User from "./database/models/User";
import { hashPassword, reg } from "./helper/helper";

dotenv.config();
const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.urlencoded());

// Sign in route
app.post("/sign-in", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const validUser = await User.authenticate(email, password);

    if (validUser) return res.json(validUser);

    return res.status(400).json({ message: "User not found" });
});

// Sign up route
app.post("/sign-up", async (req: Request, res: Response) => {
    const { givenName, email, password } = req.body;
    try {
        if (reg.test(password)) {
            const hashedPassword = await hashPassword(password);
            const newUser = await User.create({
                email: email,
                passwordHash: hashedPassword,
                givenName: givenName,
            });
            return res.json({ message: "OK" }).status(200);
        }
        return res.json({ message: "Password must have at least 1 special character, 1 uppercase letter and 1 number" });
    } catch (error: any) {
        if (error.message === "Error hash password") return res.status(500).json({ message: "Error when hash password" });
        console.log(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
