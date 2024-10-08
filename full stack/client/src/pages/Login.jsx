import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("employee"); // Set default role as employee
  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    console.log(mail + " " + pass + " " + role);
    
    axios.post("http://localhost:5000/api/v1/auth/login", {
      username: mail,
      password: pass,
      role: role // Send role to the backend
    }).then((response) => {
      localStorage.setItem("token", response.data.token);
      if(role === 'admin'){
        localStorage.setItem("role", "admin")
        navigate("/dashboard");
      }
      else {
        localStorage.setItem("role", "employee")
        navigate("/employee");
      }
    }).catch((e) => {
      navigate("/");
      console.log(e);
    })
  }

  return (
    <div className='container-fluid'>
      <div className="container-fluid h-100 border border-light w-75 shadow-lg" style={{marginTop: "150px"}}>
        <div className="row h-100 align-items-center">
          <div className="col-12 col-md-8 d-none d-md-flex justify-content-center">
            <img
              src={require("../assets/inventory_image_register.jpg")}
              alt="Inventory"
              className="img-fluid"
            />
          </div>
          <div className="col-12 col-md-4">
            <div className="container p-4">
              <form onSubmit={loginUser} className="row">
                <h2 className="mt-4 text-center">Sign in to your account</h2>
                <div className="mb-3">
                  <label htmlFor="email-address" className="form-label">Email address</label>
                  <input
                    type="text"
                    id="email-address"
                    name="email"
                    className="form-control"
                    placeholder="Email address"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    required
                  />
                </div>
                {/* Role selection tabs */}
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">Login as</label>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="employee"
                      name="role"
                      value="employee"
                      className="form-check-input"
                      checked={role === "employee"}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <label htmlFor="employee" className="form-check-label">Employee</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="admin"
                      name="role"
                      value="admin"
                      className="form-check-input"
                      checked={role === "admin"}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <label htmlFor="admin" className="form-check-label">Admin</label>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="remember-me"
                      name="remember-me"
                      className="form-check-input"
                    />
                    <label htmlFor="remember-me" className="form-check-label">Remember me</label>
                  </div>
                  <span className="text-primary">Forgot your password?</span>
                </div>
                <div>
                  <button type="submit" className="btn w-100 btn-primary">
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
