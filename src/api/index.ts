import { GeocacheDto, GeocacheRequest } from "./types";

const api = "https://api.tomcaching.fun/api";

const authentication = (password: string): { "Authorization": string } => {
    const credentials = `admin:${password}`;
    const encoded = btoa(credentials);

    return {
        "Authorization": `Basic ${encoded}`,
    };
};

const json = (headers: {[key: string]: string}): {[key: string]: string} => {
    return {
        ...headers,
        "Accept": "application/json",
        "Content-Type": "application/json"
    };
};

/**
 * Check whether the provided admin password is valid
 *
 * @param password Password to check against the API security configuration
 * @returns Whether the provided password is valid or not
 */
export const checkPassword = async (password: string): Promise<boolean> => {
    const response = await fetch(`${api}/check-password`, {
        method: "get",
        headers: authentication(password),
    });

    return response.ok;
};

type ApiResponse = Promise<Array<GeocacheDto>>;

/**
 * Fetch detailed (admin) view of all geocaches
 *
 * @param password Admin password, all the API client methods assume that the password is checked with {@link checkPassword}
 */
export const fetchCaches = async (password: string): ApiResponse => {
    return await fetch(`${api}/caches/detailed`, {
        method: "get",
        headers: authentication(password),
    }).then((response) => response.json());
};

/**
 * Create a new geocache and return list of all geocaches
 *
 * @param password Admin password, all the API client methods assume that the password is checked with {@link checkPassword}
 * @param request Geocache data
 */
export const createCache = async (password: string, request: GeocacheRequest): ApiResponse => {
    return await fetch(`${api}/caches/`, {
        method: "post",
        headers: json(authentication(password)),
        body: JSON.stringify(request)
    }).then(response => response.json());
};

/**
 * Update an existing geocache and return list of all geocaches
 * 
 * @param password Admin password, all the API client methods assume that the password is checked with {@link checkPassword}
 * @param id ID of the cache that should be updated
 * @param request Geocache data
 */
export const updateCache = async (password: string, id: number, request: GeocacheRequest): ApiResponse => {
    return await fetch(`${api}/caches/update/${id}`, {
        method: "post",
        headers: json(authentication(password)),
        body: JSON.stringify(request)
    }).then(response => response.json());
};

/**
 * Delete an existing geocache and return list of all remaining geocaches
 * 
 * @param password Admin password, all the API client methods assume that the password is checked with {@link checkPassword}
 * @param id ID of the cache that should be updated
 */
export const deleteCache = async (password: string, id: number): ApiResponse => {
    return await fetch(`${api}/caches/delete/${id}`, {
        method: "post",
        headers: json(authentication(password)),
    }).then(response => response.json());
};

/**
 * Reset an existing geocache and return list of all geocaches
 * Resetting cache means, that it is marked as not found and locked, if it is a mystery cache
 * 
 * @param password Admin password, all the API client methods assume that the password is checked with {@link checkPassword}
 * @param id ID of the cache that should be updated
 */
export const resetCache = async (password: string, id: number): ApiResponse => {
    return await fetch(`${api}/caches/reset/${id}`, {
        method: "post",
        headers: json(authentication(password)),
    }).then(response => response.json());
};
