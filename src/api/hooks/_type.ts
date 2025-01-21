
export enum FetchStatus {
    FRESH = 'fresh',
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export type FetchResult<T> = {
    response: T | null;
    status: FetchStatus;
    error: string | null;
};
