import express from 'express';
import { getMyProfile, jobApplication, login, registerUser } from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { giveAtip } from '../controllers/tip.js';
import { getAllJobs } from '../controllers/job.js';
import { checkUserLike, getAllNews, getLikes, likeNews, toggleLike, unLikeNews } from '../controllers/news.js';
import { imageNews } from '../middlewares/multer.js';
import { getAllWantedList } from '../controllers/wantedList.js';

const router = express.Router();

router.post("/new",registerUser);
router.post("/login",login);

router.use(isAuthenticated);
router.post("/",giveAtip);
router.get("/me",getMyProfile);
router.get("/list",getAllWantedList);
router.get("/jobs",getAllJobs);
router.post("/apply",imageNews,jobApplication);
router.get("/news",getAllNews);
router.post("/like",likeNews);
router.delete("/like",unLikeNews);
router.get('/like-status/:announcementId', checkUserLike);
// app.delete("/like",unLikeNews);

export default router;