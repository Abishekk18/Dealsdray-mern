import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  return (
    <ToastContainer autoClose={1500} pauseOnHover={false} theme="colored" />
  );
};

export default Toast;
