import express from "express";
import { adminLogin, adminLogout, getAdminData } from "../controllers/admin.js";
import { adminOnly } from '../middlewares/auth.js';
import { createWantedListItem, deleteWantedListItem, getAllWantedList, updateWantedListItem } from "../controllers/wantedList.js";
import { getAllTips } from "../controllers/tip.js";
import { createJob, deleteJob, editJob, getAllJobs } from "../controllers/job.js";
import { createNews, deleteNews, editNews, getAllNews } from "../controllers/news.js";
import { imageNews } from "../middlewares/multer.js";

const router = express.Router();

router.post("/verify", adminLogin);
router.get("/logout", adminLogout);

router.use(adminOnly);
router.get("/", getAdminData);
router.get("/list", getAllWantedList);
router.post("/list", imageNews, createWantedListItem);
router.put("/list/:id", updateWantedListItem);
router.delete("/list/:id", deleteWantedListItem);
router.get("/tips", getAllTips);
router.get("/jobs", getAllJobs);
router.post("/jobs", createJob);
router.put("/jobs/:id", editJob);
router.delete("/jobs/:id", deleteJob);
router.get("/news", getAllNews);
router.post("/news", imageNews, createNews);
router.put("/news/:id", editNews);
router.delete("/news/:id", deleteNews);

export default router;
