import { useState, useRef, useEffect } from 'react';
import { FetchResult, FetchStatus } from './_type';

export function useFetch<T>(url: string): FetchResult<T> {
    const [status, setStatus] = useState<FetchStatus>(FetchStatus.FRESH);
    const [response, setResponse] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const cache = useRef<{ [key: string]: T }>({});

    useEffect(() => {
        async function fetchData() {
            setStatus(FetchStatus.LOADING);
            setError(null);
            setResponse(null);

            if (cache.current[url]) {
                const data = cache.current[url];
                setResponse(data);
                setStatus(FetchStatus.SUCCESS);
            } else {
                try {
                    const response = await fetch(url, { method: 'GET' });
                    if (!response.ok) {
                        throw new Error(
                            `HTTP error! status: ${response.status}`,
                        );
                    }

                    const json: T = await response.json();
                    cache.current[url] = json;
                    setResponse(json);
                    setStatus(FetchStatus.SUCCESS);
                } catch (error) {
                    setError((error as Error).message);
                    setStatus(FetchStatus.ERROR);
                }
            }
        }

        fetchData();
    }, [url, response]);

    return { status, response, error };
}
