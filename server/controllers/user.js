import { User } from '../models/user.js';
import { Job } from '../models/job.js';
import { JobApplication } from '../models/jobApplication.js';
import { ErrorHandler } from '../utils/utility.js';
import { TryCatch} from '../middlewares/error.js';
import { compare } from 'bcrypt';
import { sendToken, uploadFilesToCloudinary } from '../utils/features.js';

const registerUser = TryCatch(async (req, res,next) => {
      try{
      const { username, email, password, confirmPassword } = req.body;
  
      if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }
  
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ message: 'User with this username or email already exists' });
      }

      const user = await User.create({ 
        username,
        email,
        password,
        confirmPassword
    });
  
      sendToken(res,user,201, "User registered successfully");
  }catch(error){
    next(error);
  }
});
  
const login = TryCatch(async (req,res,next) => {
    const { username, password } = req.body;
    const user = await User.findOne({username}).select("+password");

    const isMatch = await compare(password, user.password);
    if(!isMatch) return next(new ErrorHandler("Invalid username or password",404));

    sendToken(res,user,200, `Welcome back, ${user.username}`);
});

const logout = TryCatch(async(req,res) => {
  return res.status(200).cookie("user-token","",{...cookieOptions, maxAge: 0}).json({
      success: true,
      message: "Logout successfully",
  });
});
const getMyProfile = async (req, res, next) => {
  try {
    // const user = await User.findById(req.user._id); // Ensure _id is used

    // if (!user) {
    //   return next(new ErrorHandler('User not found', 404));
    // }

    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

const jobApplication = async (req,res,next) => {
    // Create a new job application
    const {name,age,email,phone,degree,experience,jobTitle} = req.body;
    const newApplication = await JobApplication.create({name,age,email,phone,degree,experience,jobTitle})
    res.status(201).json({ success: true,message: 'Application submitted successfully',data: newApplication });
}
export { registerUser,login,logout,getMyProfile,jobApplication };
