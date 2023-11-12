import React from 'react';
import {useState} from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate ();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { Email: Email, Password });
      const { message, jwtToken } = response.data;

      if (message === 'Login Successful') {
        // You can store the jwtToken in your application's state or localStorage for future requests.
        // Example: localStorage.setItem('token', jwtToken);
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
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Email"
        value={Email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
