'use server';

import { Resend } from 'resend';
import { ResetPasswordEmailTemplate } from '../../components/email-templates/PasswordResetEmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResetEmail(email: string, firstName: string, token: string) {
  try {
    const data = await resend.emails.send({
      from: 'Tea Shop <no-reply@tea-shop.com>',
      to: [email],
      subject: 'Reset your Tea Shop password',
      react: ResetPasswordEmailTemplate({ 
        email, 
        resetPasswordToken: token,
        firstName
      }),
    });

    return { success: true, data };
  } catch (error) {
    console.error('Error sending reset email:', error);
    return { success: false, error };
  }
}