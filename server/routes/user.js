import express from 'express';
import { login, registerUser } from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { giveAtip } from '../controllers/tip.js';
import { getAllJobs } from '../controllers/job.js';

const app = express();

app.post("/new",registerUser);
app.post("/login",login);

app.use(isAuthenticated);
app.post("/",giveAtip);
app.get("/jobs",getAllJobs);

export default app;