import express from "express";
import {
  cereateEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "../controllers/employee.js";
import { employeeValidation } from "../utils/routerUtils.js";

const router = express.Router();

router.post("/create", employeeValidation, cereateEmployee);
router.get("/get", getEmployees);
router.get("/getemployee/:id", getEmployee);
router.patch("/update/:id", employeeValidation, updateEmployee);
router.get("/delete/:id", deleteEmployee);

export default router;
