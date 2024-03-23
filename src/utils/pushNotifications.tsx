const base64ToUint8Array = (base64: string) => {
    const padding = "=".repeat((4 - (base64.length % 4)) % 4);
    const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");

    const rawData = window.atob(b64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};


// const subscribeButtonOnClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
//     if (!process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY) {
//         throw new Error("Environment variables supplied not sufficient.");
//     }
//     if (!registration) {
//         console.error("No SW registration available.");
//         return;
//     }
//     event.preventDefault();
//     const sub = await registration.pushManager.subscribe({
//         userVisibleOnly: true,
//         applicationServerKey: base64ToUint8Array(process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY),
//     });
//     // TODO: you should call your API to save subscription data on the server in order to send web push notification from the server
//     setSubscription(sub);
//     setIsSubscribed(true);
//     console.log("Web push subscribed!");
//     console.log(sub);
// };

// const unsubscribeButtonOnClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
//     if (!subscription) {
//         console.error("Web push not subscribed");
//         return;
//     }
//     event.preventDefault();
//     await subscription.unsubscribe();
//     // TODO: you should call your API to delete or invalidate subscription data on the server
//     setSubscription(null);
//     setIsSubscribed(false);
//     console.log("Web push unsubscribed!");
// };

// const sendNotificationButtonOnClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
//     event.preventDefault();
//     if (!subscription) {
//         console.error("Web push not subscribed");
//         return;
//     }

//     await fetch("/api/notification", {
//         method: "POST",
//         headers: {
//             "Content-type": "application/json",
//         },
//         body: JSON.stringify({
//             subscription,
//         }),
//     });
// };