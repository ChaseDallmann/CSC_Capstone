'use server';

import { CreateEmailOptions, CreateEmailRequestOptions, Resend } from "resend";

const resend = new Resend("re_hsBbHELG_4yUt569fziLCWPA3bZ21LfpB");

export const sendEmail = async (payload: CreateEmailOptions, options?: CreateEmailRequestOptions | undefined) => {
    try {
        const data = await resend.emails.send(payload, options);
        console.log("Email sent successfully", data);
        return { success: true, data };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error };
    }
}