'use client'

import React from "react";
import styles from './privacyPolicy.module.css';
import NavbarBasic from "../components/NavbarBasic/NavbarBasic";

export default function PrivacyPolicy() {
    return (
        <>
            <NavbarBasic />
            <div className={styles.privacyContainer}>
                <div className={styles.privacyHeader}>
                    <h1>Privacy Policy</h1>
                    <p>We value your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website.</p>
                </div>
                <h2>1. Information We Collect</h2>
                <p>We may collect personal information such as your name, email address, and phone number when you contact us or make a purchase.</p>
                <h2>2. How We Use Your Information</h2>
                <p>We use your information to process orders, communicate with you, and improve our services.</p>
                <h2>3. Data Protection</h2>
                <p>We take necessary measures to protect your data from unauthorized access or disclosure.</p>
                <h2>4. Contact Us</h2>
                <p>If you have any questions about this policy, feel free to contact us at our email address: support@aceteas.com</p>
            </div>
        </>
    );
}
