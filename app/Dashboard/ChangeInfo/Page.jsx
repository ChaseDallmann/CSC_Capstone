'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext, AuthProvider } from "@/app/Context/AuthContext";
import NavbarBasic from "@/app/components/NavbarBasic/NavbarBasic";
import Link from "next/link";
import axios from "axios";

export default function editAccountInfo() {
    const { loggedInStatus, authenticactedUser, user, userRole, handleLogout } = React.useContext(AuthContext);
    const [search, setSearch] = useState("");
    const [email, setemail] = useState(user.email);
    const [name, setName] = useState(use.name);
    const [role, setRole] = useState(user.role);
    const [error, setError] = useState(null);

}