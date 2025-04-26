'use server';

import { pusherServer } from "../pusher";

export const sendMessage = async (message: string) => {
    try {
        // This function runs on the server
        await pusherServer.trigger('teashop', 'user-message', {
            message,
        });
        
        return { success: true };
    } catch (error) {
        console.error('Error sending message:', error);
        return { success: false, error };
    }
}