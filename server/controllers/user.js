import { User } from '../models/user.js';
import { ErrorHandler } from '../utils/utility.js';
import { TryCatch} from '../middlewares/error.js';
import { compare } from 'bcrypt';
import { sendToken } from '../utils/features.js';

const registerUser = TryCatch(async (req, res) => {
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
});
  
const login = TryCatch(async (req,res,next) => {
    const { username, password } = req.body;
    const user = await User.findOne({username}).select("+password");

    const isMatch = await compare(password, user.password);
    if(!isMatch) return next(new ErrorHandler("Invalid username or password",404));

    sendToken(res,user,200, `Welcome back, ${user.username}`);
});
export { registerUser,login };
