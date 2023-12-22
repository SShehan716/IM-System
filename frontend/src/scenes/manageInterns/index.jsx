import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from 'react-router-dom';

const ManageInterns = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/get-all-user-data");
        const data = await response.json();

        //Filter only interns data
        const interns = data.users.filter((user) => user.UserRole === "Intern");

        console.log(interns);
        setUserData(interns);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleButtonClick = (userID) => {
    navigate(`/update-intern/${userID}`);
  };

  const columns = [
    { field: "UserID", headerName: "ID" },
    {
      field: "FullName",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Email",
      headerName: "Email",
      flex: 1,
    },
    {
        field: "University",
        headerName: "University",
        flex: 0.9,
        renderCell: ({ row: { InternProfile } }) => InternProfile.University,
      },
      {
        field: "Status",
        headerName: "Status",
        flex: 0.9,
        renderCell: ({ row: { InternProfile } }) => InternProfile.Status,
      },
    {
      field: "Edit", headerName: "Edit", flex: 0.4, renderCell: ({ row: { UserID } }) => {
        return (
          <Box
            width="60%"
            display="flex"
            justifyContent="center"
            backgroundColor={colors.blueAccent[600]}
            borderRadius="4px"
          >
            <IconButton
              color={colors.blueAccent[600]}
              aria-label="edit user"
              component="span"
              onClick={() => {
                handleButtonClick(UserID)
              }}
            >
              <EditOutlinedIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Manage Interns" subtitle="Managing the Company Interns" />

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={userData} columns={columns} getRowId={(row) => row.UserID} />
      </Box>
    </Box>
  );
};

export default ManageInterns;