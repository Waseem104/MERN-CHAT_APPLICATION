import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
    },
    fullName: {
      type: String,
      required: [true, "fullname is required"],
    },
    password: {
      type: String,
      required: [true, "password is required and minlength should be 6"],
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
export default userModel;
