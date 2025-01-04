import { useEffect, useState } from 'react';
import { Post } from '../../components/Post/Post';
import { sendApiRequest } from '../../api/utils/request';
import { IPost } from '../../data/_type';
import { Box, CircularProgress, Typography } from '@mui/material';
import { AddPost } from '../../components/AddPost/AddPost';

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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
            <Box sx={{ padding: '1rem', backgroundColor: 'white', borderRadius: '1rem', width: '600px' }}>
                <Typography variant='h6' align='left'>New post</Typography>
                <AddPost />
            </Box>
            {data.map((post: IPost) => (
                <Post key={post.id} post={post}/>
            ))}
        </Box>
    );
};
