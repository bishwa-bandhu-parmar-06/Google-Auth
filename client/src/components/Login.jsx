import React from 'react';
import { useNavigate } from "react-router-dom";
import GoogleLoginBtn from './GoogleLoginBtn';  
import { auth, provider } from "../utils/google.login";
import { signInWithPopup } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import styles
import './styles/login.css';

// Backend URI
const backenduri = import.meta.env.VITE_BACKEND_URI;

const Login = () => {
  const navigate = useNavigate(); // Hook for navigation

  const googleLogin = async () => {
    try {
      // Sign in with Google using Firebase Authentication
      const response = await signInWithPopup(auth, provider);
      const user = response.user;

      // Extract user data
      const userData = {
        name: user.displayName,  // Correct property for name
        email: user.email,
        avatar: user.photoURL,   // Correct property for avatar
        phoneNumber: user.phoneNumber || "", // Handle null phone numbers
      };

    //   console.log('Sending user data:', userData);

      // Send user data to backend API
      const apiResponse = await fetch(`${backenduri}/api/auth/google-login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      // Check if API request was successful
      if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        throw new Error(errorData.message || 'Failed to login');
      }

      // Redirect to dashboard
      navigate("/dashboard");

      // Show success toast
      toast.success("Login Successful! Redirecting to Dashboard...");
    } catch (error) {
      // Show error toast
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1>Welcome Back!</h1>
        <p>Login with your Google account to continue</p>
        
        {/* Google login button */}
        <GoogleLoginBtn onClick={googleLogin} />
        
        {/* Toast Container */}
        <ToastContainer position="top-center" autoClose={5000} />
      </div>
    </div>
  );
};

export default Login;
