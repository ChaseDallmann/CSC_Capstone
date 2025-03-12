import React from 'react';
import NavbarBasic from "../components/NavbarBasic/NavbarBasic";
import { Great_Vibes, Great_Vibes } from 'next/font/google';


const greatVibes = Great_Vibes({
    subsets: ['latin'],
    weight: '400',
})
const RegistrationPage = () => {
  return (
    <><NavbarBasic /><div className="login-container">
          <div className="login-box">
              <h1 style={{ fontFamily: greatVibes.style.fontFamily }}>Welcome!</h1>
              <h2>The World of Tea awaits you.</h2>
              <form>
                <label htmlFor="username">Email</label>
                <input type="text" id="username" placeholder="Enter your email" />

                  <label htmlFor="username">Email or Username</label>
                  <input type="text" id="username" placeholder="Create your username" />

                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" placeholder="Create password" />

                  <button type="submit">Create account</button>
              </form>
          </div>
      </div></>
  );
};

export default RegistrationPage;