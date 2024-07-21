import { TryCatch } from "../middlewares/error.js";
import { News } from "../models/news.js";
import { uploadFilesToCloudinary } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";

const getAllNews = TryCatch(async (req,res,next) => {
    const news = await News.find();
    res.status(200).json({success:true,data:news});
});

const createNews = TryCatch(async (req,res,next) => {
    const {title,content,location,date} = req.body;
    const file = req.file;
    if(!file) return next(new ErrorHandler("Please upload image"));
    const result = await uploadFilesToCloudinary([file]);
    const image = {
        public_id: result[0].public_id,
        url: result[0].url,
    }
    const news = await News.create({title,content,location,date,image});
    res.status(201).json({success:true,data:news});
});

const editNews = TryCatch(async (req,res,next) => {
    const {id} = req.params;
    const { title, content, location, date } = req.body;
    const news = await News.findByIdAndUpdate(id, { title, content, location, date}, {new:true});
    res.status(200).json({success:true,data:news});
});

const deleteNews = TryCatch(async (req,res,next) => {
    const {id} = req.params;
    const news = await News.findByIdAndDelete(id);
    res.status(200).json({success:true,data:news});
});

export {getAllNews, createNews, editNews, deleteNews};
