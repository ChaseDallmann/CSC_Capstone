import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavbarBasic from "./components/Navbar";
import LoginPage from "./Login/page";
import ProductPage from "./Product/page";
import HomePage from "./Home/page";
import axios from "axios";

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
            setLoggedIn(true);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogin = (userData) => {
        setLoggedIn(true);
        setUser(userData);
    };

    return (
        <Router>
            <NavbarBasic loggedIn={loggedIn} user={user} />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/product" component={ProductPage} />
                <Route exact path="/login">
                    <LoginPage handleLogin={handleLogin} />
                </Route>
            </Switch>
        </Router>
    );
}
