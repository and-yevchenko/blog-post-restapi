
export interface IPost {
    id: string;
    date: string;
    author: string;
    text?: string;
    image?: string;
    comments?: IComment[];
    likes?: Array<string>;
}

interface IComment {
    id: string;
    nickname: string;
    comment: string;
}