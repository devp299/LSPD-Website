import { adminSecretKey } from "../app.js";
import { TryCatch } from "../middlewares/error.js";
import { cookieOptions } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import jwt from 'jsonwebtoken';

const adminLogin = TryCatch(async (req,res,next) => {
    const {secretKey} = req.body;
    
    const isMatched = secretKey === adminSecretKey

    if(!isMatched) return next(new ErrorHandler("Invalid admin key",401))

    const token = jwt.sign(secretKey,process.env.JWT_SECRET);

    return res
        .status(200)
        .cookie("lspd-admin-token",token,{
            ...cookieOptions,
            maxAge: 15*24*60*60*1000
        })
        .json({
            success: true,
            message: "Authenticated Successfully, Welcome BOSS",
            token,
        })
})

const adminLogout = TryCatch(async (req,res,next) => {
    return res
        .status(200)
        .cookie("lspd-admin-token","",{
            ...cookieOptions,
            maxAge: 0
        })
        .json({
            success: true,
            message: "Logged Out Successfully",
        })
});

const getAdminData = TryCatch(async (req,res,next) => {
    return res.status(200).json({
        admin: true,
    })
});

export { adminLogin, adminLogout, getAdminData };