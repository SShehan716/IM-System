import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ContactEmergencyOutlinedIcon from '@mui/icons-material/ContactEmergencyOutlined';
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";


const ManageTeam = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/get-all-user-data");
        const data = await response.json();
        setUserData(data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);


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
      field: "UserRole",
      headerName: "Access Level",
      flex: 0.9,
      renderCell: ({ row: { UserRole } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              UserRole === "Admin"
                ? colors.greenAccent[600]
                : UserRole === "Management"
                  ? colors.greenAccent[700]
                  : UserRole === "Intern"
                    ? colors.greenAccent[500]
                    : UserRole === "Evaluator"
                      ? colors.greenAccent[800]
                      : UserRole === "Mentor"
                        ? colors.greenAccent[900]
                        : colors.grey[700]
            }
            borderRadius="4px"
          >
            {UserRole === "Admin" && <AdminPanelSettingsOutlinedIcon />}
            {UserRole === "Intern" && <PersonOutlineOutlinedIcon />}
            {UserRole === "Management" && <LockOpenOutlinedIcon />}
            {UserRole === "Evaluator" && <SecurityOutlinedIcon />}
            {UserRole === "Mentor" && <ContactEmergencyOutlinedIcon />}

            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {UserRole}
            </Typography>
          </Box>

        );
      },
    },
    {
      field: "Edit", headerName: "Edit", flex: 0.4, renderCell: ({ row: { UserID } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
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
                console.log(UserID);
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
      <Header title="TEAM" subtitle="Managing the Team Members" />

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
        <DataGrid checkboxSelection rows={userData} columns={columns} getRowId={(row) => row.UserID} />
      </Box>
    </Box>
  );
};

export default ManageTeam;