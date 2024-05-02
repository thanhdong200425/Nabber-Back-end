import express, {Express, Request, Response} from "express";
// @ts-ignore
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
    console.log("Hello World");
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})