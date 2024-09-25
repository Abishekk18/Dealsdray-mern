import Employee from "../models/Employee.js";
import { v4 } from "uuid";
import { validationResult } from "express-validator";

export const cereateEmployee = async (req, res) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return handleErrors(res, 400, errors.array()[0].msg, false);
    }
    const { name, email, mobile, designation, gender, course, image } =
      req.body;

    const id = v4();

    const newEmployee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      image,
      id,
    });

    await newEmployee.save();

    res
      .status(200)
      .json({ success: true, message: "Employee Created Successfully" });
  } catch (error) {
    res.status(500).json({ success: true, message: error.message });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.json({ employees });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employee.findById(id);

    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res
      .status(200)
      .json({ success: true, message: "Employee Updated Successfully" });
  } catch (error) {
    res.status(500).json({ success: true, message: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    await Employee.findByIdAndDelete(id);

    res.status(200).json({ message: "Employee Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
