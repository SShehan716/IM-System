import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import OutboxOutlinedIcon from '@mui/icons-material/OutboxOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import DirectionsWalkOutlinedIcon from '@mui/icons-material/DirectionsWalkOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { useEffect } from "react";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [userDetails, setUserDetails] = useState([]);
  const token = localStorage.getItem('token');
  const payload = token ? JSON.parse(atob(token.split('.')[1])) : {};
  const role = payload.Role;
  const userId = payload.id;
  const [openDialog, setOpenDialog] = useState(false);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/get-user-by-id/${userId}`);
        const data = await response.json();
        setUserDetails(data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    setOpenDialog(true);
  };

  const confirmLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setOpenDialog(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };



  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
          position: "fixed !important",
          top: "0 !important",
          bottom: "0 !important",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">

          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]} >
                  IM System
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* User */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile"
                  width="100px"
                  height="100px"
                  src={`../../profile-pictures/profile.jpg`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography variant="h5" color={colors.grey[100]} fontWeight="bold" sx={{ m: "10px 0 0 0" }}>{userDetails.FullName}</Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>{role}</Typography>
              </Box>
            </Box>
          )}

          {/* Menu Items */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item title="Dashboard" to="/dashboard" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Invite User" to="/invite-user" icon={<OutboxOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Manage Team" to="/manage-team" icon={<Groups2OutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Manage Interns" to="/manage-interns" icon={<DirectionsWalkOutlinedIcon />} selected={selected} setSelected={setSelected} />

          </Box>

          {/* Logout Button */}
          <MenuItem
            style={{
              color: colors.grey[100],
              cursor: "pointer",
              marginBottom: "10px",
              bottom: "0",
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={handleLogout}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ExitToAppOutlinedIcon fontSize="small" style={{ marginRight: '5px' }} />
              <Typography>Logout</Typography>
            </Box>
          </MenuItem>
        </Menu>
      </ProSidebar>

      {/* Logout Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{fontSize:18}}>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography sx={{fontSize:23}}>Do you want to logout?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{fontSize:16, color:colors.redAccent[300]}}>Cancel</Button>
          <Button onClick={confirmLogout} sx={{fontSize:16, color:colors.greenAccent[500]}}>Yes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Sidebar;