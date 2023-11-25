import React from 'react';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from "./scenes/global/TopBar";
import Sidebar from "./scenes/global/SideBar";
import Dashboard from "./scenes/dashboard";
import InviteUser from "./scenes/inviteUser";
import Login from "./scenes/login";
import ManageUsers from './scenes/manageUsers';
import EditUser from './scenes/editUser';
import ManageInterns from './scenes/manageInterns';


import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';


function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();
  
  const isLoginPage = location.pathname === '/login';

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!isLoginPage && <Sidebar />}
          <main className="content">
            {!isLoginPage && <Topbar />}
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/invite-user" element={<InviteUser />} />
              <Route path="/edit-user/:userID" element={<EditUser />} />
              <Route path="/manage-team" element={<ManageUsers />} />
              <Route path="/manage-interns" element={<ManageInterns />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App;
