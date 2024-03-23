declare const self: ServiceWorkerGlobalScope;

self.addEventListener("push", (event: { data: { text: () => any; }; waitUntil: (arg0: any) => void; }) => {
    const data = JSON.parse(event.data?.text() ?? '{ title: "" }');
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.message,
            icon: "/logo/logo-mobile.png",
        }),
    );
});

self.addEventListener("notificationclick", (event: { notification: { close: () => void; }; waitUntil: (arg0: any) => void; }) => {
    event.notification.close();
    event.waitUntil(
        self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList: string | any[]) => {
            if (clientList.length > 0) {
                let client = clientList[0];
                for (let i = 0; i < clientList.length; i++) {
                    if (clientList[i].focused) {
                        client = clientList[i];
                    }
                }
                return client.focus();
            }
            return self.clients.openWindow("/");
        }),
    );
});

export { };