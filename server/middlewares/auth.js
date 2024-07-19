import { adminSecretKey } from "../app.js";
import jwt from 'jsonwebtoken';
import { TryCatch } from "./error.js";
import { ErrorHandler } from "../utils/utility.js";

const isAuthenticated = TryCatch((req,res,next) => {
    const token = req.cookies["user-token"];

    if(!token) 
        return next(new ErrorHandler("Please login to access the route",401));

    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    
    req.user = decodedData._id;

    next();
});

const adminOnly = (req,res,next) => {
    const token = req.cookies["lspd-admin-token"];

    if(!token) 
        return next(new ErrorHandler("Only admin can access the route",401));

    const secretKey = jwt.verify(token,process.env.JWT_SECRET);
    const isMatched = secretKey === adminSecretKey

    if(!isMatched) return next(new ErrorHandler("Invalid Admin Key",401));

    next();
};

export {adminOnly,isAuthenticated};