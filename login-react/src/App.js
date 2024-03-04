import React, { useState } from 'react';
import './App.css'; // Assuming your CSS file is named style.css and is located in the same directory

function LoginPage() {
  const [formToShow, setFormToShow] = useState('login-form'); // Default to showing the login form

  const toggleForm = (newForm) => {
    setFormToShow(newForm);
  };

  return (
    <div className="login-page">
      <div className="form">
        <form className="register-form-student" style={{ display: formToShow === 'register-form-student' ? 'block' : 'none' }}>
          <p className="message">
            <large>Student Registration</large>
            <div style={{padding: '5px', fontSize: '36px'}}></div>
          </p>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <input type="text" placeholder="Email Address" />
          <button>create</button>
          <p className="message">Already registered? <span className="toggle-form" onClick={() => toggleForm('login-form')} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>Sign In</span></p>
        </form>

        <form className="register-form-dining-hall" style={{ display: formToShow === 'register-form-dining-hall' ? 'block' : 'none' }}>
          <p className="message">
            <large>Dining Hall Registration</large>
            <div style={{padding: '5px', fontSize: '36px'}}></div>
          </p>
          <input type="text" placeholder="Dining Hall Name" />
          <p className="message">
            The following fields are for dining hall users:
            <div style={{padding: '5px'}}></div>
          </p>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <input type="text" placeholder="Email Address" />
          <button>create</button>
          <p className="message">Already registered? <span className="toggle-form" onClick={() => toggleForm('login-form')} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>Sign In</span></p>
        </form>

        <form className="login-form" style={{ display: formToShow === 'login-form' ? 'block' : 'none' }}>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <input type="text" placeholder="Email Address" />
          <label className="toggle">
            <input className="toggle-input" type="checkbox" />
            <span className="toggle-label" data-off="Student" data-on="Dining"></span>
            <span className="toggle-handle"></span>
          </label>
          <button>login</button>
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
