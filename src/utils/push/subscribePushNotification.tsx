import { Dispatch } from "react";
// @ts-ignore
import { base64ToUint8Array } from "../pushUtility";

/**
 * Subscribes to push notifications using the provided service worker registration.
 *
 * @param {ServiceWorkerRegistration} registration - The service worker registration.
 * @param {Dispatch<React.SetStateAction<PushSubscription | null>>} setSubscription - Function to set the subscription state.
 * @param {Dispatch<React.SetStateAction<boolean>>} setIsSubscribed - Function to set the subscription status state.
 * @example
 * // Example usage:
 *
 *  try {
 *   const subscription = await subscribeToPushNotifications(registration);
 *   console.log('Push subscription successful:', subscription);
 * } catch (error) {
 *   console.error('Failed to subscribe to push notifications:', error);
 * }
 */
export const subscribeToPushNotifications = async (registration: ServiceWorkerRegistration, setSubscription: Dispatch<React.SetStateAction<PushSubscription | null>>, setIsSubscribed: Dispatch<React.SetStateAction<boolean>>) => {
    try {
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: base64ToUint8Array(process.env.WEBPUSH_PK!)
        });
        setSubscription(subscription)
        setIsSubscribed(true)
    } catch (error) {
        console.error('Failed to subscribe to push notifications:', error);
        setSubscription(null)
        setIsSubscribed(false)
    }
};