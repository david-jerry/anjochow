/**
 * Requests geolocation permission from the user. Checks if the browser supports geolocation
 * and if the permission is already granted, denied, or needs to be prompted.
 *
 * @returns {Promise<boolean>} A Promise that resolves to true if geolocation permission is granted and false otherwise.
 * @throws {Error} If there is an error during the geolocation permission request.
 *
 * @example
 * try {
 *    const isGeolocationEnabled = await requestGeolocationPermission();
 *    if (isGeolocationEnabled) {
 *        console.log('Geolocation permission granted.');
 *    } else {
 *        console.log('Geolocation permission denied or not yet requested.');
 *    }
 * } catch (error) {
 *    console.error('Error:', error.message);
 * }
 */
const requestGeolocationPermission = async (): Promise<boolean> => {
    try {
        // Check if the browser supports geolocation and permissions
        if ('permissions' in navigator && 'geolocation' in navigator) {
            // Query the geolocation permission status
            const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });

            // Check if the permission is already granted
            if (permissionStatus.state === 'granted') {
                console.log('Geolocation permission already granted.');
                return true;
            } else if (permissionStatus.state === 'prompt') {
                // If the permission is in prompt state, query again after user interaction
                const newPermissionStatus = await navigator.permissions.query({ name: 'geolocation' });

                // Check if the permission is granted after user interaction
                if (newPermissionStatus.state === 'granted') {
                    console.log('Geolocation permission granted.');
                    return true;
                } else {
                    // Log and throw an error if the permission is denied after user interaction
                    console.warn('Geolocation permission denied.');
                    return false;
                }
            } else {
                // Log and throw an error if the permission is dismissed or not yet requested
                console.warn('Geolocation permission dismissed or not yet requested.');
                return false;
            }
        } else {
            // Log and throw an error if geolocation is not supported in the browser
            console.warn('Geolocation not supported in this browser.');
            throw new Error('Geolocation not supported in this browser.');
        }
    } catch (error) {
        // Log and throw an error if there is an issue during geolocation permission request
        console.error('Error requesting geolocation permission:', error);
        throw error;
    }
};


/**
 * Requests notification permission from the user. Checks if the browser supports notifications
 * and handles the different states of notification permission (granted, denied, or dismissed).
 *
 * @returns {Promise<boolean>} A Promise that resolves with a boolean indicating whether notification permission is granted.
 * @throws {Error} If there is an error during the notification permission request.
 *
 * @example
 * try {
 *    const isNotificationEnabled = await requestNotificationPermission();
 *    if (isNotificationEnabled) {
 *        console.log('Notification permission is enabled.');
 *    } else {
 *        console.log('Notification permission is not granted or dismissed.');
 *    }
 * } catch (error) {
 *    console.error('Error:', error.message);
 * }
 */
const requestNotificationPermission = async (): Promise<boolean> => {
    try {
        // Check if the browser supports notifications
        if ('Notification' in window) {
            // Request notification permission
            const permission = await Notification.requestPermission();

            // Handle different states of notification permission
            if (permission === 'granted') {
                console.log('Notification permission granted.');
                return true;
            } else if (permission === 'denied') {
                console.warn('Notification permission denied.');
                return false;
            } else {
                console.warn('Notification permission dismissed or not yet requested.');
                return false;
            }
        } else {
            // Log a warning if notifications are not supported in the browser
            console.warn('Notifications not supported in this browser.');
            return false;
        }
    } catch (error) {
        // Log and throw an error if there is an issue during notification permission request
        console.error('Error requesting notification permission:', error);
        throw error;
    }
};



/**
 * Requests share permission from the user using the Web Share API. Checks if the browser supports
 * the Web Share API and logs whether it is supported or not.
 *
 * @returns {boolean} A boolean indicating whether the Web Share API is supported in the browser.
 *
 * @example
 * const isShareSupported = requestSharePermission();
 * if (isShareSupported) {
 *    console.log('Web Share API is supported. You can use navigator.share() to trigger the share dialog.');
 *    // Example: await navigator.share({ title: 'My cool website', url: 'https://example.com' });
 * } else {
 *    console.warn('Web Share API is not supported in this browser.');
 * }
 */
const requestSharePermission = async (): Promise<boolean> => {
    try {
        // Check if the Web Share API is supported
        if ('share' in navigator) {
            console.log('Web Share API is supported.');
            return true;
        } else {
            console.warn('Web Share API is not supported in this browser.');
            return false;
        }
    } catch (error) {
        // Log and throw an error if there is an issue during share permission request
        console.error('Error requesting share permission:', error);
        throw error;
    }
};

export { requestGeolocationPermission, requestNotificationPermission, requestSharePermission };
