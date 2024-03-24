import { NextApiRequest, NextApiResponse } from 'next';
import webPush from 'web-push';

// Set VAPID details for web push
webPush.setVapidDetails(



    `mailto:${process.env.WEBPUSH_EMAIL}`,
    process.env.WEBPUSH_PK!,
    process.env.WEBPUSH_SK!,
);

interface NotificationBody {
    subscription: PushSubscription;
    title: string;
    message: string;
}

const sendWebPushNotification = async (subscription: PushSubscription, title: string, message: string) => {
    // Send web push notification
    const response = await webPush.sendNotification(
        // @ts-ignore
        subscription,
        JSON.stringify({ title, message })
    );

    return response;
};

const Notification = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const { subscription, title, message }: NotificationBody = req.body;

            // Send web push notification
            const response = await sendWebPushNotification(subscription, title, message);
            const song = new Audio("url");
            song.play();

            // Respond with the received response from web push
            res.writeHead(response.statusCode, response.headers).end(response.body);
        } catch (error) {
            // @ts-ignore
            if ('statusCode' in error) {
                // If the error has a statusCode property, it's from web push, so respond accordingly
                // @ts-ignore
                res.writeHead(error.statusCode, error.headers).end(error.body);
            } else {
                // Log other errors and respond with a generic 500 status code
                console.error(error);
                res.statusCode = 500;
                res.end();
            }
        }
    } else {
        // Respond with 405 Method Not Allowed for non-POST requests
        res.statusCode = 405;
        res.end();
    }
};

export default Notification;
