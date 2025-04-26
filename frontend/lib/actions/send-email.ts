'use server';

import { CreateEmailOptions, CreateEmailRequestOptions, Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (payload: CreateEmailOptions, options?: CreateEmailRequestOptions | undefined) => {
    const data = await resend.emails.send(payload, options);
    console.log("Email sent successfully", data);
    return data;
}