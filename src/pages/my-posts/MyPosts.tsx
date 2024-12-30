import { useEffect, useState } from 'react';
import { Post } from '../../components/Post/Post';
import { sendApiRequest } from '../../api/utils/request';
import { IPost } from '../../data/_type';
import { CircularProgress, Typography } from '@mui/material';

export const MyPosts = () => {
    const [data, setData] = useState<IPost[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        sendApiRequest<IPost[]>('GET', '/posts')
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [data]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography variant='h5' color='error'>{error}</Typography>;

    return (
        <div>
            {data.map((post: IPost) => (
                <Post key={post.id} post={post}/>
            ))}
        </div>
    );
};
