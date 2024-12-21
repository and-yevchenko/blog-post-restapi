type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export const sendApiRequest = async <T>(method: Method, path: string, body?: Record<string, unknown>): Promise<T> => {
    const requestOptions = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (body) {
        (requestOptions as RequestInit).body = JSON.stringify(body);
      }

    const response = await fetch(path, requestOptions);
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