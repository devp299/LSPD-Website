import express from "express";
import userRoute from "./routes/user.js";
import adminRoute from "./routes/admin.js";
import dotenv from "dotenv";
import { connectDB } from "./utils/features.js";
import cors from 'cors';
import {v2 as cloudinary} from 'cloudinary';
import cookieParser from "cookie-parser";

const app = express();

dotenv.config({
    path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
export const adminSecretKey = process.env.ADMIN_SECRET_KEY;

connectDB(mongoURI);
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: [
            "http://localhost:5173",
            "http://localhost:4173",
            process.env.CLIENT_URL
        ],
        methods: ["GET","POST","PUT","DELETE"],
        credentials: true,
    }
));
// app.use(express.urlencoded());

app.use("/api/v1/user",userRoute);
app.use("/api/v1/admin",adminRoute);

app.get("/",(req,res) => {
    res.send("Hello world")
})

app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})