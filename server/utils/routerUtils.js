import { body } from "express-validator";

export const signUpRules = [
  body("username", "Enter a valid name").isLength({ min: 1 }),
  body("password", "Enter a password of minimum 8 characters").isLength({
    min: 8,
  }),
];

export const signInRules = [
  body("username", "Enter a valid name").isLength({ min: 1 }),
  body("password", "Enter A Password").exists(),
];

// id,name,email,mobile,designation,gender,course,image.

export const employeeValidation = [
  body("name", "Please Enter Name").exists().isLength({ min: 3 }),
  body("email", "Please Enter Valid Email").isEmail().exists(),
  body("mobile", "Please Enter Mobile Number").exists().isMobilePhone(),
  body("designation", "Please Select Designation").exists(),
  body("gender", "Please Select Gender").exists(),
  body("course", "Please Select Course").exists(),
  body("image", "Please Select Image").exists(),
];

export const handleErrors = (res, statusCode, message, success = false) => {
  return res.status(statusCode).json({ message, success });
};

export const isValidDateFormat = (dateString) => {
  const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
  return dateRegex.test(dateString);
};
