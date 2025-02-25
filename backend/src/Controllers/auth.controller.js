import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";
import handleErrorMessage from "../helpers/handleErrorMessage.js";
import cloudinary from "../utils/cloudinary.js";

export const signupController = async (req, res) => {
  try {
    const { email, fullName, password } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is Required" });
    }
    if (!fullName) {
      return res.status(400).json({ message: "Full name is Required" });
    }
    if (password && password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User Already Exists", success: false });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    generateToken(newUser._id, res);

    res.status(201).json({
      message: "User Signup successfully",
      success: true,
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });
  } catch (error) {
    handleErrorMessage(res, error, "Error in signup controller");
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ message: "Email is required", success: false });
    }
    if (!password) {
      return res
        .status(400)
        .json({ message: "Password is required", success: false });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "Email and password are incorrect", success: false });
    }

    generateToken(user._id, res);
    return res.status(200).json({
      message: "Login successful",
      success: true,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    handleErrorMessage(res, error, "Error in login controller");
  }
};

export const logoutController = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res
      .status(200)
      .json({ message: "Logged Out Successfully", success: true });
  } catch (error) {
    handleErrorMessage(res, error, "Error in logout controller");
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const id = req.user._id;

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );
    return res.status(200).json({
      message: "Image Uploaded Successfully",
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    handleErrorMessage(res, error, "Error in update profile controller");
  }
};

export const checkAuthController = (req, res) => {
  try {
    return res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    handleErrorMessage(res, error, "Error in check auth controller");
  }
};
