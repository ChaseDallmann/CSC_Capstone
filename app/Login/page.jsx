"use client"

import React, { Component } from 'react';
import NavbarBasic from '../components/Navbar';
import { Great_Vibes } from 'next/font/google';
import axios from "axios";
import router from 'next/router';

const greatVibes = Great_Vibes({
    subsets: ['latin'],
    weight: '400',
})

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  
  handleSubmit(event) {
    const { email, password } = this.state;

    axios
    .post(
      "http://localhost:8080/auth/login",
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    )
    .then(response => {
      if (response.data.logged_in) {
        console.log("Login successful", response.data);
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.customer));
        handleLogin(response.data.user)
        router.push("/");
      }
    })
    .catch(error => {
      console.log("Login error", error);
    });

  event.preventDefault();

  }

  render() {
    return (
      <>
        <NavbarBasic />
        <div className="login-container">
          <div className="login-box">
            <h1 style={{ fontFamily: greatVibes.style.fontFamily }}>Welcome!</h1>
            <h2>We've put the kettle on for you!</h2>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="email">Email or Username</label>
              <input 
                type="text" 
                id="email" 
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="Enter your email or username" 
              />

              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password"
                name="password" 
                value={this.state.password}
                onChange={this.handleChange}
                placeholder="Enter your password" 
              />

              <button type="submit">Login</button>
            </form>
          </div>

          <img 
            src="/placeholder.png"
            className="kettle-ani"
            alt="Kettle animation"
          />
        </div>
      </>
    );
  }
}

export default LoginPage;