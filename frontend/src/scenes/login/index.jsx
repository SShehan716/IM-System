import React, { useState } from 'react';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { tokens } from "./../../theme";



const Login = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { Email, Password });
      const { message, jwtToken } = response.data;

      if (message === 'Login Successful') {
        localStorage.setItem('token', jwtToken);
        navigate('/dashboard');
        console.log('Login successful');
      } else {
        console.log('Login failed: ' + message);
      }
    } catch (error) {
      console.error('Error: ' + error.message);
    }
  };

  return (
    <Box
      m="20px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h4" color={colors.greenAccent[400]} fontWeight="bold">Login</Typography>

      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '300px',
          width: '100%',
        }}
      >
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ my: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ my: 2 }}
        />
        <Button
          variant="contained"
          color="secondary"  // Use a primary color for the button
          onClick={handleLogin}
          sx={{ my: 2 }}
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
