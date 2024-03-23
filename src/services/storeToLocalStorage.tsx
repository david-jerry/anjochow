/**
 * A utility service for interacting with local storage.
 * @namespace
 */
const localStorageService = {
    /**
     * Retrieves data from local storage.
     * @param {string} name - The name of the item to retrieve.
     * @returns {string | null} - The retrieved data, or null if the item doesn't exist.
     */
    get: (name: string): string | null => {
        /**
         * Retrieves data from local storage.
         * @type {string | null}
         */
        if (typeof window !== 'undefined') {
            let response: string | null = window.localStorage.getItem(name);
            if (response !== null) {
                return JSON.parse(response);
            } else {
                return null;
            }
        } else {
            let response: string | null = localStorage.getItem(name);
            if (response !== null) {
                return JSON.parse(response);
            } else {
                return null;
            }
        }
        return null;
    },

    /**
     * Saves data to local storage.
     * @param {string} name - The name under which to save the data.
     * @param {any} value - The data to save.
     */
    save: (name: string, value: any) => {
        if (typeof window !== 'undefined') {
            try {
                window.localStorage.setItem(name, JSON.stringify(value));
            } catch (error) {
                console.error('Error storing data in local storage:', error);
            }
        } else {
            localStorage.setItem(name, JSON.stringify(value));
        }
        console.log("failed")
    },

    /**
     * Updates existing data in local storage.
     * @param {string} name - The name of the item to update.
     * @param {any} value - The updated data.
     */
    update: (name: string, value: any) => {
        if (typeof window !== 'undefined') {
            // Same implementation as `save`
            localStorageService.save(name, value);
        } else {
            localStorageService.save(name, value);
        }
        console.log("failed")
    },

    /**
     * Deletes data from local storage.
     * @param {string} name - The name of the item to delete.
     */
    delete: (name: string) => {
        if (typeof window !== 'undefined') {
            window.localStorage.removeItem(name);
        } else {
            localStorage.removeItem(name);
        }
        console.log("failed")
    }
};

export default localStorageService;
