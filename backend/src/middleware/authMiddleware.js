import jwt from "jsonwebtoken";
import handleErrorMessage from "../helpers/handleErrorMessage.js";
import userModel from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided", success: false });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Invalid Token", success: false });
    }
    const user = await userModel.findById(decoded.userId).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ message: "User Not Found", success: false });
    }
    req.user = user;
    next();
  } catch (error) {
    handleErrorMessage(res, error, "Error in protect Route");
  }
};
