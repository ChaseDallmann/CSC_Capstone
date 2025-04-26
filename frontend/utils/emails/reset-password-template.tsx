import React from 'react';

interface ResetPasswordEmailTemplateProps {
  email: string;
  resetPasswordToken: string;
}

export const ResetPasswordEmailTemplate: React.FC<ResetPasswordEmailTemplateProps> = ({
  email,
  resetPasswordToken,
}) => {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/PasswordReset/${resetPasswordToken}`;
  
  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      color: '#333'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ color: '#4F46E5' }}>Tea Shop</h1>
      </div>
      
      <div style={{ margin: '30px 0' }}>
        <h2>Password Reset Request</h2>
        <p>We received a request to reset the password for your account ({email}). If you didn't make this request, you can safely ignore this email.</p>
        <p>To reset your password, click on the button below:</p>
        
        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          <a 
            href={resetUrl}
            style={{
              backgroundColor: '#4F46E5',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '5px',
              textDecoration: 'none',
              fontWeight: 'bold',
              display: 'inline-block'
            }}
          >
            Reset Your Password
          </a>
        </div>
        
        <p>Or copy and paste this URL into your browser:</p>
        <p style={{ wordBreak: 'break-all', color: '#4F46E5' }}>{resetUrl}</p>
        
        <p>This link will expire in 24 hours for security reasons.</p>
        
        <p>Best regards,<br />Tea Shop Team</p>
      </div>
      
      <div style={{ 
        borderTop: '1px solid #ddd', 
        paddingTop: '20px',
        fontSize: '12px',
        color: '#666',
        textAlign: 'center'
      }}>
        <p>This is an automated message, please do not reply to this email.</p>
        <p>© {new Date().getFullYear()} Tea Shop. All rights reserved.</p>
      </div>
    </div>
  );
};