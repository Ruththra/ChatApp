import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import clodinary from 'cloudinary';
import {generateToken} from "../lib/utils.js"

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  // console.log("backend .. Signup data:", req.body);
  // console.log(req.body.name)
  try {
    // console.log("Before validation checks");
    // console.log("Name:", name, "Email:", email, "Password:", password)
    if (!name || !email || !password) {
      // console.log("Inside validation checks");
      return res.status(400).json({message :"Please fill all the fields"});
    }
    // console.log("After validation checks");
    if (password.length < 6) {
      return res.status(400).json({message :"Password must be at least 6 characters long"});
    }

    // console.log("Before await for user check");
    const user = await User.findOne({ email });
    // console.log("After await for user check");


    if (user) {
      return res.status(400).json({message :"User already exists"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    if (newUser) {
      // generate jwt token here
      await newUser.save();
      generateToken(newUser._id, res);
      

      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profilePic: newUser.profilePic,
      })
      
    } else {
      return res.status(400).json({message :"Error creating user"});
    }

  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({message: "Internal Server Error"});
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({message :"Please fill all the fields"});
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({message :"User not found"});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({message :"Invalid credentials"});
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
    });

  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({message: "Internal Server Error"});
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {maxAge: 0}); // Clear the cookie
    res.status(200).json({message: "Logged out successfully"});
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({message: "Internal Server Error"});
  }
}

export const updateProfile = async (req, res) => {
  try{
    const {profilePic} = req.body;
    const userId = req.user._id;

    if(!profilePic) {
      return res.status(400).json({message: "Please provide a profile picture"});
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in updateProfile controller", error.message);
    res.status(500).json({message: "Internal Server Error"});
  }

}

export const checkAuth = (req, res) => {
  try{
    res.status(200).json(req.user);

  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({message: "Internal Server Error"});
  }
}