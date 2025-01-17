import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/auth/login');
      if (response.status === 200) {
        history.push('/');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login with LinkedIn</button>
    </div>
  );
};

export default Login;
