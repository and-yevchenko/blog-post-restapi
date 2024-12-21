type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

const sendApiRequest = async <T>(method: Method, path: string, body?: Record<string, unknown>): Promise<T> => {
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

export const getRequest = async <T>(path: string): Promise<T> => {
    return sendApiRequest<T>('GET', path);
};

export const postRequest = async <T>(path: string, body: Record<string, unknown>): Promise<T> => {
return sendApiRequest<T>('POST', path, body);
};

export const putRequest = async <T>(path: string, body: Record<string, unknown>): Promise<T> => {
return sendApiRequest<T>('PUT', path, body);
};

export const patchRequest = async <T>(path: string, body: Record<string, unknown>): Promise<T> => {
return sendApiRequest<T>('PATCH', path, body);
};

export const deleteRequest = async <T>(path: string): Promise<T> => {
return sendApiRequest<T>('DELETE', path);
};