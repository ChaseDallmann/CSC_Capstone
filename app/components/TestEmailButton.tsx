'use client';
import React from 'react';
import { sendEmail } from '../Actions/Emails/sendEmail';
import EmailTemplate from '../components/email-template';
import axios from 'axios';

interface SendEmailButtonProps {
    emailTo: string;
    user: { firstName: string };
}

const SendEmailButton = ({ emailTo, user }: SendEmailButtonProps) => {
    const handleSubmit = async () => {
        await sendEmail({
            from: "Modern Web Development <no-reply@ace-teas.com>",
            to: [emailTo],
            subject: "You Clicked It!",
            react: EmailTemplate({ firstName: `${user?.firstName}` })
        });
    }

    return (
        <button onClick={handleSubmit} className="bg-slate-200 p-2 rounded-xl">
            Send Email
        </button>
    );
};

export default SendEmailButton;