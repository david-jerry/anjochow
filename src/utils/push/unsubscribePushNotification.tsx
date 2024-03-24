import { Dispatch } from "react";

/**
 * Unsubscribes from push notifications using the provided subscription and performs additional cleanup tasks.
 *u
 * @param {PushSubscription} subscription - The push notification subscription.
 * @param {Dispatch<React.SetStateAction<PushSubscription | null>>} setSubscription - Function to set the subscription state.
 * @param {Dispatch<React.SetStateAction<boolean>>} setIsSubscribed - Function to set the subscription status state.
 * @returns {Promise<boolean>} A promise that resolves with true if unsubscribed successfully, otherwise false.
 * @example
 * // Example usage in a JSX page file:
 *
 * // Assuming you have state variables subscription and isSubscribed, and corresponding setter functions setSubscription and setIsSubscribed
 * const handleUnsubscribe = async () => {
 *   try {
 *     const isUnsubscribed = await unsubscribeAndCleanup(subscription, setSubscription, setIsSubscribed);
 *     if (isUnsubscribed) {
 *       console.log('Unsubscribed from push notifications');
 *     } else {
 *       console.log('Failed to unsubscribe from push notifications');
 *     }
 *   } catch (error) {
 *     console.error('Error:', error);
 *   }
 * };
 *
 * // Call handleUnsubscribe when needed, for example in a button click handler
 * <button onClick={handleUnsubscribe}>Unsubscribe</button>
 */
export const unsubscribeAndCleanup = async (
    subscription: PushSubscription,
    setSubscription: Dispatch<React.SetStateAction<PushSubscription | null>>,
    setIsSubscribed: Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        // Unsubscribe from push notifications
        await subscription.unsubscribe();

        // Perform cleanup tasks
        // For example, you may want to call your API to delete or invalidate subscription data on the server
        // After that, update local state
        setSubscription(null);
        setIsSubscribed(false);

    } catch (error) {
        console.error('Failed to unsubscribe from push notifications:', error);
    }
};
