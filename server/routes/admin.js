import express from "express";
import { adminLogin, adminLogout, getAdminData } from "../controllers/admin.js";
import { adminOnly } from '../middlewares/auth.js';
import { createWantedListItem, deleteWantedListItem, getAllWantedList, updateWantedListItem } from "../controllers/wantedList.js";
import { getAllTips } from "../controllers/tip.js";
import { createJob, deleteJob, editJob, getAllJobs } from "../controllers/job.js";
import { createNews, deleteNews, editNews, getAllNews } from "../controllers/news.js";
import { imageNews } from "../middlewares/multer.js";
const app = express.Router();

app.post("/verify",adminLogin);
app.get("/logout",adminLogout);

// app.use(adminOnly);
app.get("/",getAdminData);
app.get("/list",getAllWantedList);
app.post("/list",imageNews,createWantedListItem);
app.put("/list/:id",updateWantedListItem);
app.delete("/list/:id",deleteWantedListItem);
app.get("/tips",getAllTips);
app.get("/jobs",getAllJobs);
app.post("/jobs",createJob);
app.put("/jobs/:id",editJob);
app.delete("/jobs/:id",deleteJob);
app.get("/news",getAllNews);
app.post("/news",imageNews,createNews);
app.put("/news/:id",editNews);
app.delete("/news/:id",deleteNews);

export default app;