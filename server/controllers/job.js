import { Job } from "../models/job.js";
import { TryCatch } from '../middlewares/error.js'

const getAllJobs = TryCatch(async (req,res,next) => {
    const jobs = await Job.find();
    res.status(200).json({success:true,data:jobs});
});

const createJob = TryCatch(async (req,res,next) => {
    const { title, description, department, location, requirements, benefits } = req.body;
    const job = await Job.create({ title, description, department, location, requirements, benefits });
    res.status(201).json({success:true,data:job});
});

const editJob = TryCatch(async (req,res,next) => {
    const {id} = req.params;
    const { title, description, department, location, requirements, benefits } = req.body;
    const job = await Job.findByIdAndUpdate(id, { title, description, department, location, requirements, benefits }, {new:true, runValidators:true});
    res.status(200).json({success:true,data:job});
});

const deleteJob = TryCatch(async (req,res,next) => {
    const {id} = req.params;
    const job = await Job.findByIdAndDelete(id);
    res.status(200).json({success:true});
});

export {getAllJobs,createJob,editJob,deleteJob};