import * as React from 'react';

interface EmailTemplateProps {
    firstName: string;
    resetToken: string;
}

export const EmailTemplate = ({ firstName,resetToken }: EmailTemplateProps) => (
    <div>
        <h1>Hey, {firstName}!</h1>
        <a href={`http://localhost:3000/PasswordReset/${resetToken}`}>
            Click here to reset your password
        </a>
        <p>
            If you didnt request this, please ignore this email.
        </p>
        <p>
            This link will expire in 24 hours.
        </p>
        <p>
            Thank you for being a valued customer!
        </p>
    </div>
);

export default EmailTemplate;