import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogin, useLogout } from '../Services/Auth';
import { useAuth } from '../Hooks/useAuth';
import { showToast } from '../Components/Toast';
import { setData, setRoles, setToken } from '../Store/actions';

/**
 * Example component demonstrating proper usage of login/logout system
 * This shows how to use the useLogin and useLogout hooks correctly
 */
const LoginLogoutExample = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get authentication state
  const { token, role, user } = useAuth();
  
  // Initialize login and logout hooks
  const login = useLogin();
  const handleLogout = useLogout();

  // Example login function
  const handleLogin = async (credentials) => {
    try {
      // For demo purposes, using static credentials
      // Replace with actual API endpoint when backend is ready
      const apiEndpoint = '/api/auth/login'; // Replace with your actual API endpoint
      
      // Uncomment this line when using real API
      // const response = await login(apiEndpoint, credentials);
      
      // For demo, using static data
      const demoUser = {
        email: credentials.email,
        password: credentials.password,
        token: 'demo-token-123',
        role: 'user',
        message: 'Login successful'
      };

      if (demoUser.email === 'demo@example.com' && demoUser.password === 'password') {
        // Set user data in Redux store
        dispatch(setToken(demoUser.token));
        dispatch(setRoles(demoUser.role));
        dispatch(setData(demoUser));
        
        showToast(demoUser.message, 'success');
        
        // Navigate based on role
        setTimeout(() => {
          if (demoUser.role === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/');
          }
        }, 1000);
      } else {
        showToast('Invalid credentials', 'error');
      }
    } catch (error) {
      console.error('Login error:', error);
      showToast('Login failed. Please try again.', 'error');
    }
  };

  // Example logout function
  const logout = async () => {
    try {
      showToast('Logout Successfully', 'success');
      
      // Call logout service
      await handleLogout(role);
      
      // Navigate to home page
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      console.error('Logout error:', error);
      showToast('Logout failed', 'error');
    }
  };

  return (
    <div className="login-logout-example">
      <h3>Login/Logout System Example</h3>
      
      {/* Show current authentication state */}
      <div className="auth-state">
        <h4>Current Authentication State:</h4>
        <p><strong>Token:</strong> {token ? 'Present' : 'Not present'}</p>
        <p><strong>Role:</strong> {role || 'Not set'}</p>
        <p><strong>User:</strong> {user ? JSON.stringify(user) : 'Not logged in'}</p>
      </div>

      {/* Login form */}
      {!token && (
        <div className="login-section">
          <h4>Login</h4>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            handleLogin({
              email: formData.get('email'),
              password: formData.get('password')
            });
          }}>
            <div>
              <label>Email:</label>
              <input type="email" name="email" defaultValue="demo@example.com" required />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" name="password" defaultValue="password" required />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      )}

      {/* Logout button */}
      {token && (
        <div className="logout-section">
          <h4>Logout</h4>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default LoginLogoutExample;
