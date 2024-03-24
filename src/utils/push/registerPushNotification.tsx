import { Dispatch } from "react";

/**
 * Registers the service worker and manages subscription.
 *
 * @param {Dispatch<React.SetStateAction<PushSubscription|null>>} setSubscription - Function to set the subscription.
 * @param {Dispatch<React.SetStateAction<boolean>>} setIsSubscribed - Function to set subscription status.
 * @param {Dispatch<React.SetStateAction<ServiceWorkerRegistration|null>>} setRegistration - Function to set the service worker registration.
 * @returns {void}
 * @example
 * // Example usage:
 * ```javascript
 * registerServiceWorker(
 *   setSubscriptionFunction,
 *   setIsSubscribedFunction,
 *   setRegistrationFunction
 * );
 * ```
 */
export const registerServiceWorker = (setSubscription: Dispatch<React.SetStateAction<PushSubscription|null>>, setIsSubscribed: Dispatch<React.SetStateAction<boolean>>, setRegistration: Dispatch<React.SetStateAction<ServiceWorkerRegistration>>) => {
    // @ts-ignore
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
        // run only in browser
        navigator.serviceWorker.ready.then(reg => {
            reg.pushManager.getSubscription().then(sub => {
                if (sub && !(sub.expirationTime && Date.now() > sub.expirationTime - 5 * 60 * 1000)) {
                    setSubscription(sub);
                    setIsSubscribed(true);
                }
            });
            setRegistration(reg);
        });
    }
};