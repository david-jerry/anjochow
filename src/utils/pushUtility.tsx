/**
 * Converts a base64 string to a Uint8Array.
 * @param {string} base64 - The base64 string to convert.
 * @returns {Uint8Array} The Uint8Array representation of the base64 string.
 * ---------------------------------------
 * @example
 * const base64String = 'your-base64-string';
 * const uint8Array = base64ToUint8Array(base64String);
 * console.log(uint8Array);
 */
export const base64ToUint8Array = (base64: string) => {
    const padding = "=".repeat((4 - (base64.length % 4)) % 4);
    const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");

    const rawData = typeof window !== 'undefined' ? window.atob(b64) : Buffer.from(b64, 'base64').toString('binary');
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};
