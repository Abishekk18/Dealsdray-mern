import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import adminRoutes from "./routes/admin.js";
import employeeRoutes from "./routes/employee.js";

/*CONFIGURATION*/
dotenv.config();
const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

/*Default Route*/

/*API Routes*/
app.use("/api/admin", adminRoutes);
app.use("/api/employee", employeeRoutes);

/*MongoDB Connection*/

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`App Is Running At http://localhost: ${PORT}`);
  });
})
.catch((error) =>{
    console.error("Error connecting to MongoDB:",error.message);

});
