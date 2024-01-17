import express, {Request, Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/users'

mongoose.connect(process.env.MONGO_CONNECTION_STRING as string);

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))  // helps to parse url
app.use(cors())  //cors for security purpose

// app.get("/api/test", async (req: Request, res: Response) => {
//     res.json({ message: "hello from express endpoint!" });
// });
app.use("/api/users", userRoutes)

app.listen(7000, () => {
    console.log("server running Con localhost:7000 ");
});