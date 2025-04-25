'use client'

import React from "react";
import styles from "./contact.module.css";
import NavbarBasic from "../components/NavbarBasic/NavbarBasic";

export default function Contact() {
    return (
        <>
        <NavbarBasic />
        <div className={styles.contactContainer}>
            <div className={styles.contactHeader}>
                <h1>Contact Us</h1>
                <p>If you have any questions, concerns, or feedback, feel free to reach out!</p>
            </div>
            <form action="mailto:youremail@example.com" method="POST" enctype="text/plain">
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="name">Name</label>
                    <input className={styles.input} type="text" id="name" name="name" required />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="email">Email</label>
                    <input className={styles.input} type="email" id="email" name="email" required />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="message">Message</label>
                    <textarea className={styles.textarea} id="message" name="message" required></textarea>
                </div>
                <button className={styles.button} type="submit">Send Message</button>
            </form>
        </div>
        </>
    );
}