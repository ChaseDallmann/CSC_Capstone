'use server';

import { Resend } from 'resend';

// Make sure your API key is properly set in .env.local
const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function sendResetEmail(email: string, resetPasswordToken: string) {
  try {
    // For debugging
    console.log('Sending reset email to:', email);
    console.log('Using API key:', process.env.RESEND_API_KEY ? 'API key exists' : 'API key missing');
    
    // Instead of using a React component which can be complex to debug,
    // let's use a simple HTML string for now to verify email delivery
    const data = await resend.emails.send({
      from: 'Tea Shop <no-reply@ace-teas.com>', // Make sure this domain is verified in Resend
      to: [email],
      subject: 'Reset your Tea Shop password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="text-align: center;">
            <h1 style="color: #4F46E5;">Tea Shop</h1>
          </div>
          
          <div style="margin: 30px 0;">
            <h2>Password Reset Request</h2>
            <p>Hello,</p>
            <p>We received a request to reset the password for your account (${email}). If you didn't make this request, you can safely ignore this email.</p>
            <p>To reset your password, click on the button below:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a 
                href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/PasswordReset/${resetPasswordToken}"
                style="background-color: #4F46E5; color: white; padding: 12px 24px; border-radius: 5px; text-decoration: none; font-weight: bold; display: inline-block;"
              >
                Reset Your Password
              </a>
            </div>
            
            <p>Or copy and paste this URL into your browser:</p>
            <p style="word-break: break-all; color: #4F46E5;">${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/PasswordReset/${resetPasswordToken}</p>
            
            <p>This link will expire in 24 hours for security reasons.</p>
            
            <p>Best regards,<br />Tea Shop Team</p>
          </div>
          
          <div style="border-top: 1px solid #ddd; padding-top: 20px; font-size: 12px; color: #666; text-align: center;">
            <p>This is an automated message, please do not reply to this email.</p>
          </div>
        </div>
      `,
    });

    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending reset email:', error);
    return { success: false, error };
  }
}