import mongoose from "mongoose";

const { Schema, model } = mongoose;

const adminSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const Admin = model("Admin", adminSchema);

export default Admin;
