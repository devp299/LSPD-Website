import { TryCatch } from "../middlewares/error.js";
import { Tip } from "../models/tips.js";

const giveAtip = TryCatch(async(req,res,next) => {
    const { message } = req.body;
    const tip = new Tip({ message });
    await tip.save();
    res.status(200).json({ message: "Tip given" });
});

const getAllTips = TryCatch(async(req,res,next) => {
    const tips = await Tip.find().sort({ createdAt: -1 });
    res.status(200).json({ tips });
});

export { giveAtip, getAllTips};
