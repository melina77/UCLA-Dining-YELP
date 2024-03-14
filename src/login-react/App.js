import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './App.css';
import { jwtDecode } from 'jwt-decode';

function LoginPage({setUserType}) {
  const [formToShow, setFormToShow] = useState('login-form'); // default to showing the login form
  const [toggleValue, setToggleValue] = useState('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dining_hall_name, set_dining_hall_name] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  // depending on the toggle, decides which user login form to show
  const toggleForm = (newForm) => {
    setFormToShow(newForm);
  };

  // change the toggle on the login to determine the endpoint and form to use
  const handleToggleChange = () => {
    //update toggle value
    setToggleValue(toggleValue === 'student' ? 'dining hall' : 'student');
  };

  // called on submit for the login form
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // define the inputed data (dining hall or username depneding on the type of user)
    const userData = {
      username: (toggleValue === 'dining hall' ? '' : username),
      password: password,
      email: email,
      dining_hall_name: (toggleValue === 'dining hall' ? dining_hall_name : '')
    };

    const endpoint = toggleValue === 'dining hall' ? '/dining-login' : '/student-login';
    
    // fetch post request to login a student or dining user
    fetch("http://localhost:8080" + endpoint, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // alert users if the login failed
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        alert('Login failed, please try again!');
        throw new Error('Authentication failed');
      }
    })
    // if login is successful: store authentication token and navigate to home page
    .then(data => {
      localStorage.setItem('authToken', data.token);
      setUserType(toggleValue);
      console.log('Authentication successful:', data.token);
      navigate('/home')
    })
    .catch(error => {
      console.error('Authentication error:', error.message);
    });
  };

  // called on click of 'create' button
  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username: username,
      password: password,
      email: email,
      dining_hall_name: dining_hall_name
    };
    
    // if user clicked the student registration form:
    if (formToShow === 'register-form-student') {
      if (password.length < 8) {
        alert("Password must be atleast 8 characters");
        console.error("Password must be atleast 8 characters");
        return;
      }
      // post request to send student registration data to the student registration endpoint
      fetch('http://localhost:8080/student-register', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      // check if the registration failed and alert the users
      .then(response => {
        if (response.ok) {
          return response.json();
        } else{
            alert('Student registration failed');
        }
      })
      // if successful, store the authentication token locally, navigate to home
      .then(res => {
          localStorage.setItem('authToken', res.token);
          setUserType('student');
          console.log('Student registration successful');
          navigate('/home')
        })
        //  catch network error
      .catch(error => {
        alert("Username or email taken");
        console.error('Network error: ', error);
      });
      // if user clicked it the dining registration form
    } else if (formToShow === 'register-form-dining-hall') {
      // check if password length is greater than 8 on submission
      if (password.length < 8) {
        alert('Network error! Is your password at least 8 characters?');
        return console.error("Input Error: Password is not more than 8 characters");
      }
      
      // post request to send dining hall registration data to the dining hall registration endpoint
      fetch('http://localhost:8080/dining-register', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      // check if the registration failed: email already exists
      .then(response => {
        if (response.ok) {
          return response.json();
        } else{
            alert("Error! Email already exists!");
            console.error('Dining hall registration failed');
        }
      })
      // if successful, store authentication token locally, and navigate to home
      .then(res => {
        localStorage.setItem('authToken', res.token);
        setUserType('dining hall');
        console.log('Dining Hall registration successful');
        navigate('/home')
      })
      // catch network errors
      .catch(error => {
        console.error('Network error: ', error);
      });
    }
  };
  
  return (
    <div className = "app">
      <header className="header">
        <div className="logo-container">
          <img src="/bruingrub-high-resolution-logo-transparent.png" alt="Logo" className="logo" />
        </div>
      </header>
      <div className="login-page">
        <div className="form">
          {/* STUDENT REGISTRATION FORM */}
          <form className="register-form-student" onSubmit={handleRegistrationSubmit} style={{ display: formToShow === 'register-form-student' ? 'block' : 'none' }}>
            <p className="message">
              <large>Student Registration</large>
              <div style={{padding: '5px', fontSize: '36px'}}></div>
            </p>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" placeholder="Password (at least 8 characters)" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input type="text" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <button>create</button>
            <p className="message">Already registered? <span className="toggle-form" onClick={() => toggleForm('login-form')} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>Sign In</span></p>
          </form>

          {/* DINING REGISTRATION FORM */}
          <form className="register-form-dining-hall" onSubmit={handleRegistrationSubmit} style={{ display: formToShow === 'register-form-dining-hall' ? 'block' : 'none' }}>
            <p className="message">
              <large>Dining Hall Registration</large>
              <div style={{padding: '5px', fontSize: '36px'}}></div>
            </p>
            <input type="text" placeholder="Dining Hall Name" value={dining_hall_name} onChange={(e) => set_dining_hall_name(e.target.value)}/>
            <p className="message">
              The following fields are for individual dining hall staff:
              <div style={{padding: '5px'}}></div>
            </p>
            <input type="text" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password (at least 8 characters)" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button>create</button>
            <p className="message">Already registered? <span className="toggle-form" onClick={() => toggleForm('login-form')} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>Sign In</span></p>
          </form>

          {/* GENERAL LOGIN FORM */}
          <form className="login-form" onSubmit={handleLoginSubmit} style={{ display: formToShow === 'login-form' ? 'block' : 'none' }}>
            <input type="text" placeholder= {toggleValue === 'dining hall' ? 'Dining Hall Name' : 'Username'} value={toggleValue === 'dining hall' ? dining_hall_name : username} onChange={(e) => toggleValue === 'dining hall' ? set_dining_hall_name(e.target.value) : setUsername(e.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input type="text" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}/>
            {/* TOGGLE BETWEEN STUDENT AND DINING LOGIN */}
            <label className="toggle">
              <input 
                className="toggle-input" 
                type="checkbox" 
                checked={toggleValue === 'dining hall'} //check based on toggleValue
                onChange={handleToggleChange} //handle toggle change
              />
              <span className="toggle-label" data-off="Student" data-on="Dining"></span>
              <span className="toggle-handle"></span>
            </label>
            <button type="submit">login</button>
            <p className="message">Not registered? Create account as: <span className="toggle-form" onClick={() => toggleForm('register-form-student')} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}> Student</span> or <span className="toggle-form" onClick={() => toggleForm('register-form-dining-hall')} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}> Dining-affiliated</span></p>
          </form>
        </div>
      </div>
    </div>
    
  );
}

export default LoginPage;