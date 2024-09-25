import {
  Avatar,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addEmployee, updateEmployee } from "../../functions";
import { convertBase64 } from "../../utils/base64";
import Toast from "../Toast";

const Form = ({ edit }) => {
  const [info, setInfo] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
  });
  const [img, setImg] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const onChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
    console.log(info);
  };

  const imgChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);

    setImg(base64);
  };

  const addEmp = async () => {
    const adding = await addEmployee(info, img);

    if (adding.success) {
      toast.success(adding.message);
      setInfo({
        name: "",
        email: "",
        mobile: "",
        designation: "",
        gender: "",
        course: "",
      });
      setImg("");
    } else {
      toast.error(adding.message);
    }
  };

  const updateEmp = async () => {
    const updating = await updateEmployee(info, img, id);

    console.log(updating);
    if (updating.success) {
      toast.success(updating.message);
      setTimeout(() => {
        navigate("/list");
      }, 2500);
    } else {
      toast.error(updating.message);
    }
  };

  const getUser = async () => {
    if (!id) {
      return;
    }
    const response = await fetch(
      `http://localhost/api/employee/getemployee/${id}`
    );
    const json = await response.json();
    const { name, email, mobile, designation, gender, course } = json.employee;
    setInfo({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
    });
    setImg(json.employee.image);
  };
  useEffect(() => {
    getUser();
    console.log("first");
    //eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Paper sx={{ p: 4, mt: 4 }} elevation={12}>
        <Grid gap={2} container>
          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            xs={12}
          >
            <Typography fontWeight={700} variant="h3">
              {edit ? "Edit Employee" : "Add Employee"}
            </Typography>
          </Grid>
          <Grid xs={5} item>
            <TextField
              label="Name"
              placeholder="Enter Name"
              fullWidth
              required
              sx={{ my: 1 }}
              name="name"
              value={info.name}
              onChange={onChange}
            />
          </Grid>
          <Grid xs={5} item>
            <TextField
              label="Email"
              placeholder="Enter Email"
              type="email"
              fullWidth
              required
              sx={{ my: 1 }}
              name="email"
              value={info.email}
              onChange={onChange}
            />
          </Grid>
          <Grid xs={5} item>
            <TextField
              label="Mobile Number"
              placeholder="Enter Mobile Number"
              type="number"
              fullWidth
              required
              sx={{ my: 1 }}
              name="mobile"
              value={info.mobile}
              onChange={onChange}
            />
          </Grid>
          <Grid sx={{ display: "flex", alignItems: "center" }} xs={5} item>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Designation</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Designation"
                name="designation"
                value={info.designation}
                onChange={onChange}
              >
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Sales">Sales</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid sx={{ display: "flex", alignItems: "center" }} xs={10} item>
            <FormLabel id="d">Image</FormLabel>
            {/* <TextField
              type="file"
              fullWidth
              required
              sx={{ my: 1, display: img === "" ? "block" : "none" }}
              name="ing"
              onChange={imgChange}
            /> */}
            <input
              type="file"
              id="inp"
              style={{ display: "none" }}
              onChange={imgChange}
            />
            <label htmlFor="inp">
              <Avatar
                onClick={() => {
                  document.querySelector('input[type="file"]').focus();
                }}
                sx={{ ml: 2, cursor: "pointer" }}
                src={img}
              />
            </label>
          </Grid>
          <Grid sx={{ display: "flex", alignItems: "center" }} xs={3} item>
            <FormControl sx={{ display: "flex" }}>
              <FormLabel id="demo-radio-buttons-group-label2">Cource</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label2"
                name="course"
                value={info.course}
                onChange={onChange}
              >
                <FormControlLabel value="BCA" control={<Radio />} label="BCA" />
                <FormControlLabel value="MCA" control={<Radio />} label="MCA" />
                <FormControlLabel value="BSC" control={<Radio />} label="BSC" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid sx={{ display: "flex", alignItems: "center" }} xs={3} item>
            <FormControl sx={{ display: "flex" }}>
              <FormLabel id="demo-radio-buttons-group-label3">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label3"
                name="gender"
                value={info.gender}
                onChange={onChange}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
            }}
            xs={12}
            item
          >
            <Button
              size="large"
              sx={{ textTransform: "inherit" }}
              variant="contained"
              onClick={edit ? updateEmp : addEmp}
            >
              {edit ? "Update" : "Add"}
            </Button>
          </Grid>
        </Grid>
        <Toast />
      </Paper>
    </Container>
  );
};

export default Form;

// name, email, mobile, designation, gender, course, image;
