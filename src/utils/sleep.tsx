/**
 * Asynchronously sleep for a specified number of milliseconds.
 *
 * @param {number} ms - The number of milliseconds to sleep.
 * @returns {Promise<void>} A Promise that resolves after the specified sleep duration.
 *
 * @example
 * await sleep(2000); // Sleep for 2 seconds
 * console.log('After sleep'); // This line will be executed after the sleep duration
 *
 * // This function is useful for introducing delays in asynchronous code.
 */
export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}