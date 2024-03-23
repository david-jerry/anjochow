
const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL; // || "http://localhost:8000/api/v1"
/**
 * Represents a service for making HTTP requests to an API Endpoint.
 * @namespace
 */
const apiService = {
    /**
     * Performs a GET request to the specified URL.
     * @async
     * @param {string} url - The URL to which the GET request will be made.
     * @param {string | undefined} token - The authorization token (optional).
     * @returns {Promise<any>} - A promise that resolves with the response data.
     */
    get: async (url: string, token: string | undefined): Promise<any> => {
        return new Promise((resolve, reject) => {
            if (token === undefined) {
                fetch(`${BASE_URL}${url}`, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    }
                })
                    .then(response => response.json())
                    .then((data) => {
                        console.log("Response Data", data);
                        resolve(data)
                    }).catch((error) => {
                        reject(error)
                    })
            } else if (token !== undefined) {

                fetch(`${BASE_URL}${url}`, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                    .then(response => response.json())
                    .then((data) => {
                        console.log("Response Data", data);
                        resolve(data)
                    }).catch((error) => {
                        reject(error)
                    })
            }
        });
    },

    /**
     * Performs a POST request to the specified URL.
     * @async
     * @param {string} url - The URL to which the POST request will be made.
     * @param {any} body - The data to be sent in the request body.
     * @param {string | undefined} token - The authorization token (optional).
     * @returns {Promise<any>} - A promise that resolves with the response data.
     */
    post: async (url: string, body: {}, token: string | undefined): Promise<any> => {
        return new Promise((resolve, reject) => {
            if (token === undefined) {
                fetch(`${BASE_URL}${url}`, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                })
                    .then(response => response.json())
                    .then((data) => {
                        console.log("Response Data", data);
                        resolve(data)
                    }).catch((error) => {
                        reject(error)
                    })
            } else if (token !== undefined) {

                fetch(`${BASE_URL}${url}`, {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                })
                    .then(response => response.json())
                    .then((data) => {
                        console.log("Response Data", data);
                        resolve(data)
                    }).catch((error) => {
                        reject(error)
                    })
            }
        });
    },

    /**
     * Performs an update (PATCH) request to the specified URL.
     * @async
     * @param {string} url - The URL to which the PATCH request will be made.
     * @param {any} body - The data to be sent in the request body.
     * @param {string | undefined} token - The authorization token (optional).
     * @returns {Promise<any>} - A promise that resolves with the response data.
     */
    update: async (url: string, body: any, token: string | undefined): Promise<any> => {
        return new Promise((resolve, reject) => {
            if (token === undefined) {
                fetch(`${BASE_URL}${url}`, {
                    method: "PATCH",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                })
                    .then(response => response.json())
                    .then((data) => {
                        console.log("Response Data", data);
                        resolve(data)
                    }).catch((error) => {
                        reject(error)
                    })
            } else if (token !== undefined) {

                fetch(`${BASE_URL}${url}`, {
                    method: "PATCH",
                    body: JSON.stringify(body),
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                })
                    .then(response => response.json())
                    .then((data) => {
                        console.log("Response Data", data);
                        resolve(data)
                    }).catch((error) => {
                        reject(error)
                    })
            }
        });
    },

    /**
     * Performs a DELETE request to the specified URL.
     * @async
     * @param {string} url - The URL to which the DELETE request will be made.
     * @param {string | undefined} token - The authorization token (optional).
     * @returns {Promise<any>} - A promise that resolves with the response data.
     */
    delete: async (url: string, token: string | undefined): Promise<any> => {
        return new Promise((resolve, reject) => {
            if (token === undefined) {
                fetch(`${BASE_URL}${url}`, {
                    method: "DELETE",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                })
                    .then(response => response.json())
                    .then((data) => {
                        console.log("Response Data", data);
                        resolve(data)
                    }).catch((error) => {
                        reject(error)
                    })
            } else if (token !== undefined) {

                fetch(`${BASE_URL}${url}`, {
                    method: "DELETE",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                })
                    .then(response => response.json())
                    .then((data) => {
                        console.log("Response Data", data);
                        resolve(data)
                    }).catch((error) => {
                        reject(error)
                    })
            }
        });
    }
};

export default apiService;