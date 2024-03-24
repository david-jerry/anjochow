/**
 * Sends a notification using the provided subscription and dynamic API URL.
 * 
 * @param {PushSubscription | null} subscription - The push notification subscription.
 * @param {string} apiUrl - The dynamic API URL where the notification should be sent.
 * @returns {Promise<void>} A promise that resolves when the notification is sent successfully.
 * @throws {Error} If subscription is null or sending notification fails.
 * @example
 * // Example usage:
 * try {
 *   await sendNotification(subscription, '/api/notification');
 *   console.log('Notification sent successfully');
 * } catch (error) {
 *   console.error('Failed to send notification:', error);
 * }
 */
export const sendNotification = async (subscription: PushSubscription | null, title: string, message: string): Promise<void> => {
    if (!subscription) {
        throw new Error('Web push not subscribed');
    }

    try {
        const response = await fetch("/api/push-notification/send-notification", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "subscription": subscription,
                "title": title,
                "message":message,
            })
        });

        if (!response.ok) {
            throw new Error('Failed to send notification');
        }
    } catch (error) {
        console.error('Failed to send notification:', error);
        throw error;
    }
};
