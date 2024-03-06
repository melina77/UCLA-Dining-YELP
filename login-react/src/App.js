import React, { useState } from 'react';
import './App.css'; // Assuming your CSS file is named style.css and is located in the same directory

function LoginPage() {
  const [formToShow, setFormToShow] = useState('login-form'); // Default to showing the login form
  const [toggleValue, setToggleValue] = useState('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dining_hall_name, set_dining_hall_name] = useState('');
  const [email, setEmail] = useState('');

  const toggleForm = (newForm) => {
    setFormToShow(newForm);
  };

  const handleToggleChange = () => {
    //update toggle value
    setToggleValue(toggleValue === 'student' ? 'dining hall' : 'student');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username: username,
      password: password,
      email: email
    };
    
    if (toggleValue === 'student') {
      console.log('Submitting data for student:', userData);
    } 
    else if (toggleValue === 'dining hall') {
      // Handle form data for dining hall login
      console.log('Submitting data for dining hall:', userData);
    }
  };

  //commented implementation does not take into account the Student/Dining Hall toggle

  // const handleRegistrationSubmit = (e) => {
  //   e.preventDefault();
  //   //logic to handle registration submission
  //   const userData = {
  //     username: username,
  //     password: password,
  //     email: email
  //   };
  //   //can send userData to your backend for further processing
  //   console.log(userData);
  // };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username: username,
      password: password,
      dining_hall_name: dining_hall_name,
      email: email
    };
    
    if (formToShow === 'register-form-student') {
      // Send student registration data to the student registration endpoint
      fetch('/student-register', {//replace with URL of backend endpoint
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if(response.ok){
          console.log('Student registration successful');
        }
        else{
          console.error('Student registration failed');
        }
      })
      .catch(error => {
        console.error('Network error: ', error);
      });
    } else if (formToShow === 'register-form-dining-hall') {
      // Send dining hall registration data to the dining hall registration endpoint
      fetch('/dining-register', {//replace with URL of backend endpoint
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if(response.ok){
          console.log('Dining Hall registration successful');
        }
        else{
          console.error('Dining hall registration failed');
        }
      })
      .catch(error => {
        console.error('Network error: ', error);
      });
    }
  };
  
  
  return (
    <div className="login-page">
      <div className="form">
        <form className="register-form-student" onSubmit={handleRegistrationSubmit} style={{ display: formToShow === 'register-form-student' ? 'block' : 'none' }}>
          <p className="message">
            <large>Student Registration</large>
            <div style={{padding: '5px', fontSize: '36px'}}></div>
          </p>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <input type="text" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <button>create</button>
          <p className="message">Already registered? <span className="toggle-form" onClick={() => toggleForm('login-form')} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>Sign In</span></p>
        </form>

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
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button>create</button>
          <p className="message">Already registered? <span className="toggle-form" onClick={() => toggleForm('login-form')} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>Sign In</span></p>
        </form>

        <form className="login-form" onSubmit={handleLoginSubmit} style={{ display: formToShow === 'login-form' ? 'block' : 'none' }}>
          <input type="text" placeholder= {toggleValue === 'dining hall' ? 'Dining Hall Name' : 'Username'} value={username} onChange={(e) => setUsername(e.target.value)}/>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <input type="text" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <label className="toggle">
            <input 
              className="toggle-input" 
              type="checkbox" 
              checked={toggleValue === 'dining hall'}//check based on toggleValue
              onChange={handleToggleChange}//handle toggle change
            />
            <span className="toggle-label" data-off="Student" data-on="Dining"></span>
            <span className="toggle-handle"></span>
          </label>
          <button type="submit">login</button>
          <p className="message">Not registered? Create account as: <span className="toggle-form" onClick={() => toggleForm('register-form-student')} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}> Student</span> or <span className="toggle-form" onClick={() => toggleForm('register-form-dining-hall')} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}> Dining-affiliated</span></p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;


/*$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
 }); */
