'use server';


import crypto from 'crypto';
import React from 'react';
import { sendEmail } from "./sendEmail"
import { AuthContext } from "../Context/AuthContext";
import { ResetPasswordEmailTemplate } from '../../components/email-templates/PasswordResetEmailTemplate';
import axios from 'axios';
import { ArrowUpSquare } from 'lucide-react';

export const resetPassword = async (email, user) => {

    if (!user) {
        console.error("User is not available.");
        return;
    }

    console.log('Resetting password for ' + email);

    const resetPasswordToken = crypto.randomBytes(32).toString("base64url");
    const today = new Date();
    const expiryDate = new Date(today.setDate(today.getDate() + 1)); // 24 hours from now

    const response = await axios.post('http://localhost:8080/reset-password', {
        email,
        resetPasswordToken,
        expiryDate
    });

    await sendEmail({
        from: 'Admin <noreply@ace-teas.com>',
        to: [email],
        subject: 'Reset your password',
        react: ResetPasswordEmailTemplate({email, resetPasswordToken})
    });

    return "Password reset email sent"
};