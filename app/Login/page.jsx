import React from 'react';
import NavbarBasic from "../components/NavbarBasic/NavbarBasic";
import { Great_Vibes, Great_Vibes } from 'next/font/google';


const greatVibes = Great_Vibes({
    subsets: ['latin'],
    weight: '400',
})
const LoginPage = () => {
  return (
    <><NavbarBasic /><div className="login-container">
          <div className="login-box">
              <h1 style={{ fontFamily: greatVibes.style.fontFamily }}>Welcome Back!</h1>
              <h2>We've put the kettle on for you!</h2>
              <form>
                  <label htmlFor="username">Email or Username</label>
                  <input type="text" id="username" placeholder="Enter your email or username" />

                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" placeholder="Enter your password" />

                  <button type="submit">Login</button>
              </form>
          </div>

          <img 
            src="/placeholder.png"
            className="kettle-ani"
            />
      </div></>
  );
};

export default LoginPage;