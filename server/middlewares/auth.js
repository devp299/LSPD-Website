import jwt from 'jsonwebtoken';
import { adminSecretKey } from "../app.js"; // Ensure the correct path
import { TryCatch } from "./error.js";
import { ErrorHandler } from "../utils/utility.js";
import { User } from '../models/user.js';

const isAuthenticated = async (req, res, next) => {
  let token;
  
  // Check if token is in cookies or headers
  if (req.cookies['user-token']) {
    token = req.cookies['user-token'];
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Log the token for debugging purposes
  // console.log('Token:', token);

  if (!token) {
    return next(new ErrorHandler('Login to access this route', 401));
  }

  try {
    // Verify token
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    // console.log('Decoded Data:', decodedData);
    req.user = await User.findById(decodedData._id);

    // If user not found
    if (!req.user) {
      return next(new ErrorHandler('User not found', 404));
    }

    next();
  } catch (err) {
    return next();
  }
};



const adminOnly = TryCatch((req, res, next) => {
  let token;
  
  // Check if token is in cookies or headers
  if (req.cookies['lspd-admin-token']) {
    token = req.cookies['lspd-admin-token'];
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
    if (!token) return next(new ErrorHandler("Only admin can access this route", 401));

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decodedData);
        // if (decodedData !== adminSecretKey) {
        //     return next(new ErrorHandler("Invalid Admin Key", 401));
        // }
        next();
    } catch (err) {
      next(new ErrorHandler("Invalid or expired admin token", 401));    
      // next();
    }
});

export { adminOnly, isAuthenticated };
