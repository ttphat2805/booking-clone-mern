import User from "../models/userModel.js";
import { comparePassword, encryptPassword } from "../utils/hash.js";
import { generateToken } from "../config/jwt.js";

export const registerUser = async (req, res) => {
  const { phone, email, password, fullname } = req.body;
  if (!phone || !email || !password || !fullname) {
    res.status(400).json("Please Enter all the Fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    {
      res.status(400).json("User already exists");
    }
  }

  let data = {
    ...req.body,
    password: encryptPassword(password),
  };

  const user = await User.create(data);

  if (user) {
    res.status(201).json({
      _id: user._id,
      token: generateToken(user._id, user.isAdmin),
    });
  } else {
    res.status(400).json("Failed to Create the User");
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json("Please Enter all the Fields");
  }

  const user = await User.findOne({ email });
  if (user && comparePassword(user.password, password)) {
    res.json({
      _id: user._id,
      fullname: user.fullname,
      isAdmin: user.isAdmin,
      token: generateToken(user._id, user.isAdmin),
    });
  } else {
    res.status(401).json("Invalid email or Password");
  }
};
