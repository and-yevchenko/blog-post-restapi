type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';


const API_BASE_URL = 'http://localhost:3000';

export const sendApiRequest = async <T>(method: Method, path: string, body?: Record<string, unknown>): Promise<T> => {
    const url =`${API_BASE_URL}${path}`

    const requestOptions = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (body) {
        (requestOptions as RequestInit).body = JSON.stringify(body);
      }

    const response = await fetch(url, requestOptions);
    const bodyData = await response.json();

    if (response.ok) {
        return bodyData;
    } else {
        throw {
            code: response.status,
            success: false,
            data: bodyData,
        }
    }
};