'use server';

import { Resend } from 'resend';

// Use environment variable for API key
const apiKey = "re_hsBbHELG_4yUt569fziLCWPA3bZ21LfpB";
const resend = new Resend(apiKey);

export async function sendResetEmail(email: string, resetPasswordToken: string) {
  try {
    // For debugging
    console.log('Sending reset email to:', email);
    
    // Check if email is valid
    if (!email || !email.includes('@')) {
      throw new Error('Invalid email address');
    }
    
    // Simple HTML to reduce potential issues
    const htmlContent = `
      <div>
        <h1>Tea Shop Password Reset</h1>
        <p>Hello,</p>
        <p>We received a request to reset the password for your account (${email}).</p>
        <p>To reset your password, click this link:</p>
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/PasswordReset/${resetPasswordToken}">Reset Your Password</a></p>
        <p>Or copy this URL: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/PasswordReset/${resetPasswordToken}</p>
        <p>This link expires in 24 hours.</p>
        <p>Best regards,<br />Tea Shop Team</p>
      </div>
    `;

    // Use promise with timeout to avoid hanging forever
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Email request timed out')), 10000)
    );

    const emailPromise = resend.emails.send({
      from: 'Tea Shop <no-reply@ace-teas.com>',
      to: [email],
      subject: 'Reset your Tea Shop password',
      html: htmlContent,
    });

    // Race the email send against the timeout
    const data = await Promise.race([emailPromise, timeoutPromise]);
    
    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending reset email:', error);
    // Log specific error details to help diagnose the issue
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return { success: false, error };
  }
}