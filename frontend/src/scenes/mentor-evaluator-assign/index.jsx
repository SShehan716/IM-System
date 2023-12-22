import { Box, Typography, useTheme, Select, MenuItem, TextField, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from 'react-router-dom';

const AssignMentorsEvaluators = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/get-all-user-data");
                const data = await response.json();

                //Filter only interns data that Status is Intership Started
                const interns = data.users.filter((user) => user.UserRole === "Intern" && user.InternProfile.Status === "Internship Started");
                setUserData(interns);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const navigate = useNavigate();

    const handleSaveClick = (userID) => {
       console.log(userID);
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
            field: "Mentor",
            headerName: "Mentor",
            flex: 1,
            renderCell: ({ row }) => (
                <Select
                    value={row.Mentor || ""}
                    onChange={(e) => handleSaveClick(row.UserID)}
                >
                    <MenuItem value="mentor1">Mentor 1</MenuItem>
                    <MenuItem value="mentor2">Mentor 2</MenuItem>
                </Select>
            ),
        },
        {
            field: "Evaluator",
            headerName: "Evaluator",
            flex: 1,
            renderCell: ({ row }) => (
                <Select
                    value={row.Evaluator || ""}
                    onChange={(e) => handleSaveClick(row.UserID)}
                >
                    <MenuItem value="evaluator1">Evaluator 1</MenuItem>
                    <MenuItem value="evaluator2">Evaluator 2</MenuItem>
                </Select>
            ),
        },
        {
      field: "Save",
      headerName: "Save",
      flex: 0.4,
      renderCell: ({ row: { UserID } }) => (
        <Box
          width="60%"
          display="flex"
          justifyContent="center"
          backgroundColor={colors.greenAccent[500]}
          borderRadius="4px"
        >
          <Button
            variant="contained"
            onClick={() => handleSaveClick(UserID)}
          >
            Save
          </Button>
        </Box>
      ),
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

export default AssignMentorsEvaluators;