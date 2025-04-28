import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY || "re_hsBbHELG_4yUt569fziLCWPA3bZ21LfpB";
const resend = new Resend(apiKey);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { email, resetPasswordToken } = req.body;
    
    // Check if email is valid
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email address' });
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

    const data = await resend.emails.send({
      from: 'Tea Shop <no-reply@ace-teas.com>',
      to: [email],
      subject: 'Reset your Tea Shop password',
      html: htmlContent,
    });
    
    console.log('Email sent successfully:', data);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error sending reset email:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'An error occurred while sending the email' 
    });
  }
}