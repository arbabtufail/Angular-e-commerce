import mongoose from "mongoose";
import { userDto } from "../dto/User";

const userSchema = new mongoose.Schema<userDto>(
  {
    fullName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
