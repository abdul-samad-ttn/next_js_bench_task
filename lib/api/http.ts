import apiConfig from "./config";

async function apiGet<T>(path: string): Promise<T> {
    const response = await fetch(`${apiConfig.apiBaseUrl}${path}`);
    if (!response.ok) {
        if(response.status === 404) {
            return null as unknown as T;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json() as Promise<T>;
}

export { apiGet };