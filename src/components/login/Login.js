import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './login.css';

import axios from 'axios';
import { setLoginDataRedux } from '../../app/features/userSlice';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = async (e) => {
    e.preventDefault();
     await axios
      .post('https://perfectpractice-academy.com/users/login', {
        email,
        password,
      })
      .then((data) => {
        dispatch(setLoginDataRedux(data));
        if (data.data.user.isAdmin) {
          navigate('/category');
        } else {
          navigate('/error');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form action="" onSubmit={(e) => login(e)}>
        <input
          type="text"
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
