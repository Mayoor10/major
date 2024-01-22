import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import './Common.css';
import user_icon from '..//..//../public/images/person.png';
import email_icon from '..//..//../public/images/email.png';
import password_icon from '..//..//../public/images/password.png';

const SignUp = () => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [alertData, setAlertData] = useState({ error: null, message: null });

  const Data = () => {
    fetch('http://localhost:5000/signUp', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        password: password,
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setAlertData({ error: data.error, message: null });
        } else {
          setAlertData({ error: null, message: data.message });
          console.log(data);
          navigate('http://localhost:5000/signIn')
        }
        handleClick(); // Trigger Snackbar when data is received
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error appropriately, perhaps set an error state
      });
  };



  return (
    <div className='container'>
      <div className="header">
        <img src="/images/login-logo.svg" alt="" />
      </div>
      <div className="inputs">
        <div className="input">
          <img src={user_icon} alt="" />
          <input type="text" placeholder='Username' value={name} onChange={(e)=>setName(e.target.value)} />
        </div>

        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder='Email'
          value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder='Password'
          value = {password} onChange={(e)=>{setPassword(e.target.value)}}/>
        </div>
      </div>

      <div className="submit-container">
        <button onClick={() => Data()} className="submit">
          Sign Up
        </button>
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alertData.error ? 'error' : 'success'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertData.error || alertData.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SignUp