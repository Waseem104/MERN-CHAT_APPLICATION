import handleErrorMessage from "../helpers/handleErrorMessage.js";
import messageModel from "../models/message.model.js";
import userModel from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import { getReceiverSocketId } from "../utils/socket.js";
import { io } from "../utils/socket.js";

export const getUsersForSidebarController = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await userModel
      .find({ _id: { $ne: loggedInUserId } })
      .select("-password");
    return res.status(200).json({
      message: "Users fetched Successfully",
      success: true,
      users: filteredUsers,
    });
  } catch (error) {
    handleErrorMessage(res, error, "Error in get users controller");
  }
};

export const getMessagesController = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await messageModel.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    return res.status(200).json({ success: true, messages: messages });
  } catch (error) {
    handleErrorMessage("Error in get messages controller");
  }
};

export const sendMessageController = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new messageModel({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    const savedMessage = await newMessage.save();

    // todo: realtime functionality goes here ==>socket.io

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({ success: true, newMessage: savedMessage });
  } catch (error) {
    handleErrorMessage(res, error, "Error in send message controller");
  }
};
