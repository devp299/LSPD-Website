import { TryCatch } from "../middlewares/error.js";
import { Tip } from "../models/tips.js";

const giveAtip = TryCatch(async(req,res,next) => {
    const { message } = req.body;
    const tip = await Tip.create({ message });
    res.status(200).json({ success: true,data: tip });
});

const getAllTips = TryCatch(async(req,res,next) => {
    const tips = await Tip.find().sort({ createdAt: -1 });
    res.status(200).json({ tips });
});

export { giveAtip, getAllTips};
