import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // React Router hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return; // Prevent multiple submissions
    setIsLoading(true);

    try {
      // Fetch users from db.json
      const response = await axios.get('http://localhost:3001/users');
      console.log('Response data:', response.data);

      // Check if email and password match any user
      const users = response.data;
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        console.log('User found:', user);
        onLogin(user.id); // Pass user ID or token to onLogin
        navigate('/TodoForm'); // Redirect to TodoForm
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('An error occurred while logging in.');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div style={{
      width: '800px',
      height: '380px',
      margin: 'auto',
      padding: '20px',
      borderRadius: '10px'
    }}>
      <h2 style={{ textAlign: 'center', fontSize: '68px', margin: '15px' }}>Login</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{textAlign: 'center'}} className="form-group mb-3">
          <label className="email-con" htmlFor="email" style={{textAlign: 'center',fontWeight: 'bold'}}>Email ID : &nbsp;&nbsp;&nbsp;</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div><br/>
        <div style={{textAlign: 'center'}} className="form-group mb-3">
          <label style={{textAlign: 'center',fontWeight: 'bold'}} htmlFor="password">Password : </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div><br/>
        <button
          type="submit"
          className="btn btn-primary"
          style={{
            width: '15%',
            paddingLeft: '10px 20px',
            borderRadius: '50px',
            marginLeft: '340px'
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="mt-3">
        <p style={{ textAlign: 'center', paddingTop:'12px' }}>
          Don’t have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
