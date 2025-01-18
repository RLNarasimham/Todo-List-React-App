import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Register.css';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      setSuccessMessage('');
      return;
    }

    try {
      // Check if email already exists
      const response = await axios.get('http://localhost:3001/users', {
        params: { email },
      });
      const existingUser = response.data.find((user) => user.email === email);

      if (existingUser) {
        setErrorMessage('Email already registered. Please use a different email.');
        setSuccessMessage('');
        return;
      }

      // If email is not registered, proceed with registration
      const newUser = {
        username,
        email,
        password,
      };

      await axios.post('http://localhost:3001/users', newUser);
      setSuccessMessage('Registration successful!');
      setErrorMessage('');

      // Clear form fields
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setErrorMessage('Error saving user data. Please try again later.');
      setSuccessMessage('');
      console.error('Error:', error);
    }
  };

  return (
    <div style={{width: '400px', marginTop: '2px'}}>
      <h5 className="card-title" style={{ textAlign: 'center', fontSize: '45px', marginBottom: '5px' }}>Register</h5>
      <form onSubmit={handleSubmit}>
        <div 
        style={{
          marginTop: '5px', display: 'flex', alignItems: 'center', gap: '10px'
          }} className="form-group mb-3">
          <label style={{textAlign: 'center',fontWeight: 'bold'}} htmlFor="name">UserName :</label>
          <input
            type="text"
            className="form-control"
            id="name"
            style={{
              flex: '1', padding: '8px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
            placeholder="Please Enter UserName"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div style={{marginTop: '15px', display: 'flex', alignItems: 'center', gap: '10px'}} className="form-group mb-3">
          <label style={{textAlign: 'center',fontWeight: 'bold'}} htmlFor="email">Email ID :</label>
          <input
          style={{
              flex: '1', padding: '8px',
              borderRadius: '5px',
              border: '1px solid #ccc'
          }}
            type="email"
            className="form-control"
            id="email"
            placeholder="Please Enter your Email-ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{marginTop: '15px', display: 'flex', alignItems: 'center', gap: '10px'}} className="form-group mb-3">
          <label style={{textAlign: 'center',fontWeight: 'bold'}} htmlFor="password">Password : </label>
          <input
            style={{
              flex: '1', padding: '8px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div style={{marginTop: '15px', display: 'flex', alignItems: 'center', gap: '10px'}} className="form-group mb-3">
          <label style={{textAlign: 'center',fontWeight: 'bold'}} htmlFor="confirmPassword">Confirm Password : </label>
          <input
            style={{
              flex: '1', padding: '8px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div><br/>
        <button type="submit" className="btn btn-primary"
        style={{alignItems: 'center',paddingLeft: '10px 20px', width: '25%', borderRadius: '50px',
          marginLeft: '140px'}}
        >
          Register
        </button>
        {errorMessage && (
          <div id="errorMessage" className="alert alert-danger mt-3" role="alert">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div id="successMessage" className="alert alert-success mt-3" role="alert">
            {successMessage}
          </div>
        )}
      </form>
      <div style={{textAlign:'center'}} className="mt-3">
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default RegistrationForm;