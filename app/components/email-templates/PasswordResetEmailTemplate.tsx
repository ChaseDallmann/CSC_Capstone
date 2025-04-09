import * as React from 'react';

interface ResetPasswordEmailTemplateProps {
    email: string;
    resetPasswordToken: string;
    firstName?: string;
}

export const ResetPasswordEmailTemplate: React.FC<Readonly<ResetPasswordEmailTemplateProps>> = ({ 
    email, 
    resetPasswordToken,
    firstName = 'Valued Customer'
}) => (
    <div style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f7f7f7',
        borderRadius: '5px'
    }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h1 style={{ color: '#4f46e5' }}>Tea Shop Password Reset</h1>
        </div>
        
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', marginBottom: '20px' }}>
            <h2 style={{ marginTop: 0 }}>Hello {firstName},</h2>
            
            <p>
                We received a request to reset the password for your Tea Shop account associated with <b>{email}</b>.
            </p>
            
            <p>
                To reset your password, please click on the button below and follow the instructions:
            </p>
            
            <div style={{ textAlign: 'center', margin: '30px 0' }}>
                <a 
                    href={`http://localhost:3000/PasswordReset/${resetPasswordToken}`}
                    style={{
                        backgroundColor: '#4f46e5',
                        color: 'white',
                        padding: '12px 24px',
                        textDecoration: 'none',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        display: 'inline-block'
                    }}
                >
                    Reset Your Password
                </a>
            </div>
            
            <p>
                If you did not request a password reset, please ignore this email or contact our support team if you have concerns.
            </p>
            
            <p>
                This password reset link will expire in 24 hours.
            </p>
        </div>
        
        <div style={{ textAlign: 'center', color: '#666', fontSize: '14px' }}>
            <p>© 2024 Tea Shop. All rights reserved.</p>
            <p>If you&apos;re having trouble clicking the reset password button, copy and paste the URL below into your web browser:</p>
            <p style={{ wordBreak: 'break-all' }}>
                http://localhost:3000/PasswordReset/{resetPasswordToken}
            </p>
        </div>
    </div>
);