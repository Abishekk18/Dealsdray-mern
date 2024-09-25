import { Avatar, Button, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Toast from "../Toast";
import { toast } from "react-toastify";

const List = () => {
  const [emp, setEmp] = useState([]);
  const getEmps = async () => {
    const response = await fetch("http://localhost/api/employee/get");
    const json = await response.json();

    setEmp(json.employees);
  };

  const deleteEmp = async (id) => {
    const response = await fetch(`http://localhost/api/employee/delete/${id}`);
    const json = await response.json();
    toast.success(json.message);
    getEmps();
  };

  const columns = [
    {
      field: "image",
      headerAlign: "center",
      headerName: "Image",
      align: "center",
      flex: 1,
      renderCell: ({ row: { image } }) => {
        return <Avatar src={image} />;
      },
    },
    {
      field: "name",
      headerName: "Name",
      headerAlign: "center",
      flex: 1,
      align: "center",
      renderCell: ({ row: { name } }) => {
        return <Typography variant="h6">{name}</Typography>;
      },
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "center",
      flex: 1,
      renderCell: ({ row: { email } }) => {
        return <Typography variant="h6">{email}</Typography>;
      },
    },
    {
      field: "mobile",
      headerName: "Mobile No",
      headerAlign: "center",
      flex: 1,
      align: "center",
      renderCell: ({ row: { mobile } }) => {
        return <Typography variant="h6">{mobile}</Typography>;
      },
    },
    {
      field: "designation",
      headerName: "Designation",
      headerAlign: "center",
      flex: 1,
      align: "center",
      renderCell: ({ row: { designation } }) => {
        return <Typography variant="h6">{designation}</Typography>;
      },
    },
    {
      field: "gender",
      headerName: "Gender",
      headerAlign: "center",
      flex: 1,
      align: "center",
      renderCell: ({ row: { gender } }) => {
        return <Typography variant="h6">{gender}</Typography>;
      },
    },
    {
      field: "course",
      headerName: "Course",
      headerAlign: "center",
      flex: 1,
      align: "center",
      renderCell: ({ row: { course } }) => {
        return <Typography variant="h6">{course}</Typography>;
      },
    },
    {
      field: "createdDate",
      headerName: "Date",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { createdDate } }) => {
        const originalDate = new Date(createdDate);

        const day = originalDate.getDate().toString().padStart(2, "0");
        const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
        const year = originalDate.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;

        return <Typography variant="h6">{formattedDate}</Typography>;
      },
    },
    {
      field: "id",
      headerName: "Edit",
      headerAlign: "center",
      flex: 1,
      type: Date,
      align: "center",
      renderCell: ({ row: { _id } }) => {
        return (
          <>
            <Button
              color="primary"
              component="a"
              href={`http://localhost:3000/edit/${_id}`}
              variant="contained"
            >
              Edit
            </Button>
          </>
        );
      },
    },
    {
      field: "_id",
      headerName: "Delete",
      headerAlign: "center",
      flex: 1,
      type: Date,
      align: "center",
      renderCell: ({ row: { _id } }) => {
        return (
          <>
            <Button
              onClick={() => {
                deleteEmp(_id);
              }}
              color="error"
              variant="contained"
              sx={{ ml: 1 }}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    getEmps();
    console.log("first");
  }, []);

  return (
    <Paper
      elevation={12}
      sx={{
        width: "100%",
        height: "87vh",
        mt: 2,
        "& .MuiDataGrid-columnHeader": {
          backgroundColor: "primary.main",
          border: "none",
          fontSize: "1rem",
          color: "white",
        },
        "& .MuiDataGrid-footerContainer": {
          backgroundColor: "primary.main",
          borderTop: "none",
          color: "white",
        },
        "& .css-hpjhlg-MuiTablePagination-root": {
          color: "white !important",
        },
      }}
    >
      <DataGrid rows={emp} columns={columns} disableSelectionOnClick />
      <Toast />
    </Paper>
  );
};

export default List;
