import mongoose from "mongoose";

const { Schema, model } = mongoose;

const employeeSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: Number, required: true },
    designation: { type: String, required: true },
    gender: { type: String, required: true },
    course: { type: String, required: true },
    createdDate: { type: Date, default: Date.now() },
    image: { type: String, required: true },
    id: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Employee = model("Employee", employeeSchema);

export default Employee;
//id,name,email,mobile,designation,gender,course,createdDate,image.
