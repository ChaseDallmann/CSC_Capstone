'use client'

import React, { use, useState } from 'react';
import NavbarBasic from "../components/NavbarBasic/NavbarBasic";
import { Great_Vibes } from 'next/font/google';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const greatVibes = Great_Vibes({
    subsets: ['latin'],
    weight: '400',
})
const RegistrationPage = () => {

  const router = useRouter();

  //Set variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [fullName, setFullName] = useState('');
  const [state, setState] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [registerErrors, setRegisterErrors] = useState('');

  //Handle submissions
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/register",
        {
            name: firstName + " " + lastName,
            address: address1 + " " + address2,
            city: city,
            state: state,
            zipcode: zipCode,
            email: email,
            password: password
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        router.push("/Login")
      }
    } catch (error) {
      setRegisterErrors('Invalid info submitted')
    }
  };
  return (
    <>
    <NavbarBasic /><div className="login-container">
          <div className="login-box">
              <h1 style={{ fontFamily: greatVibes.style.fontFamily }}>Welcome!</h1>
              <h2>The World of Tea awaits you.</h2>
              <form onSubmit={handleSubmit}>
              {registerErrors && <p style={{ color: 'red' }}>{registerErrors}</p>}

              <label htmlFor="username">Email</label>
              <input type="text" id="username" placeholder="Create your username" 
                    value={email} onChange={(e) => setEmail(e.target.value)} required />

              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Create password" 
                    value={password} onChange={(e) => setPassword(e.target.value)} required />

              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} required />

              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" value={lastName} 
                    onChange={(e) => setlastName(e.target.value)} required />

              <label htmlFor="address-line-1">Street #1</label>
              <input type="text" id="address-line-1" value={address1} 
                    onChange={(e) => setAddress1(e.target.value)} required />

              <label htmlFor="address-line-2">Street #2</label>
              <input type="text" id="address-line-2" value={address2} 
                    onChange={(e) => setAddress2(e.target.value)} />

              <label htmlFor="city">City</label>
              <input type="text" id="city" value={city} 
                    onChange={(e) => setCity(e.target.value)} required />

              <label htmlFor="state">State</label>
              <select id="state" value={state} onChange={(e) => setState(e.target.value)} required>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
              </select>

              <label htmlFor="zipCode">Zip</label>
              <input type="text" pattern="[0-9]*" id="zipCode" value={zipCode} 
                    onChange={(e) => setZipCode(e.target.value)} required />

              <button type="submit">Create account</button>
            </form>

          </div>
      </div></>
  );
};

export default RegistrationPage;