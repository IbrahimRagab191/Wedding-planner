import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../Redux/Action";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerState = useSelector((state) => state.register);

  const [role, setRole] = useState("user");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (registerState.success) {
      navigate("/");
    }
  }, [registerState.success, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!firstName || !lastName || !username || !email || !phone || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    dispatch(
      register({
        first_name: firstName,
        last_name: lastName,
        username,
        email,
        phone,
        password,
        role,
      })
    );
  };

  return (
    <div className="register-page">
        <div className="register-container">
          <h2>Create Account</h2>

          {errorMessage && <div className="custom-alert warning">{errorMessage}</div>}
          {registerState.error && <div className="custom-alert danger">{registerState.error}</div>}
          {registerState.success && (
            <div className="custom-alert success">Registration successful! Redirecting...</div>
          )}
          {registerState.loading ? (
              <div className="spinner-container">
                <div className="spinner-border custom-spinner" />
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                 <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === "user"}
                  onChange={() => setRole("user")}
                />
                I'm a User
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="vendor"
                  checked={role === "vendor"}
                  onChange={() => setRole("vendor")}
                />
                I'm a Vendor
              </label>
            </div>

            <div className="name-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="register-btn">Register</button>

            <p className="login-link">
              Already have an account? <a href="/">Login here</a>
            </p>
              </form>
            )}
        </div>
      </div>
  );
}

export default Register;
