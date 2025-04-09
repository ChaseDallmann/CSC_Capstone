import { NextRequest, NextResponse } from 'next/server';
import { sendResetEmail } from '../../Actions/Emails/sendResetEmail';

export async function POST(req: NextRequest) {
  try {
    const { email, firstName, token } = await req.json();
    
    if (!email || !token) {
      return NextResponse.json(
        { error: 'Email and token are required' },
        { status: 400 }
      );
    }
    
    const result = await sendResetEmail(
      email,
      token
    );
    
    if (!result.success) {
      console.error('Failed to send reset email:', result.error);
      return NextResponse.json(
        { error: 'Failed to send reset email' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in send-reset API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}