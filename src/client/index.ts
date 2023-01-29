const api = process.env.USE_LOCALHOST_API
    ? "http://localhost:8080/api"
    : "https://api.tomcaching.fun/api";

type Headers = Record<string, string>;

const authorization = (password: string, headers: Headers = {}): Headers => {
    const credentials = `admin:${password}`;
    const token = Buffer.from(credentials).toString("base64");

    return {
        ...headers,
        "Authorization": `Basic ${token}`
    };
};

const json = (headers: Headers = {}): Headers => {
    return {
        ...headers,
        "Accept": "application/json",
        "Content-Type": "application/json"
    };
};

export const checkPassword = async (password: string): Promise<boolean> => {
    const response = await fetch(`${api}/check-password`, { headers: authorization(password) });

    return response.ok;
};
