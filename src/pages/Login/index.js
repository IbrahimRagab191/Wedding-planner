import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/Action";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.login);

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isEmail = (input) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!emailOrUsername || !password) {
      return setErrorMessage("All fields are required.");
    }

    if (!isEmail(emailOrUsername) && emailOrUsername.length < 3) {
      return setErrorMessage("Username must be at least 3 characters.");
    }

    if (password.length < 6) {
      return setErrorMessage("Password must be at least 6 characters.");
    }

    dispatch(login(emailOrUsername, password));
  };

useEffect(() => {
  if (loginState.isAuthenticated) {
    if (loginState.user?.role === "vendor") {
      navigate("/VendorProfile");
    } else if (loginState.user?.role === "user") {
      navigate("/home");
    }
  }  
}, [loginState.isAuthenticated, loginState.user, navigate]);


  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Welcome Back</h2>

        {errorMessage && <div className="custom-alert warning">{errorMessage}</div>}
        {loginState.error && <div className="custom-alert danger">{loginState.error}</div>}

        {loginState.loading ? (
          <div className="spinner-container">
            <div className="spinner-border custom-spinner" />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email or Username</label>
              <input
                type="text"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                placeholder="Enter your email or username"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            <div className="forgot-password">
              <a href="#">Forgot your password?</a>
            </div>

            <button type="submit" className="login-btn">Login</button>

            <p className="register-link">
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;

