import { useState } from 'react';
import { Post } from '../../components/Post/Post';
import { IPost } from '../../api/utils/_type';
import { Box, CircularProgress, Typography } from '@mui/material';
import { AddPost } from '../../components/AddPost/AddPost';
import { ActionPostType } from '../../components/AddPost/_type';
import { DialogWindow } from '../../components/ui/DialogWindow';
import { useFetch } from '../../api/hooks/useFetch';
import { FetchStatus } from '../../api/hooks/_type';

export const MyPosts = () => {
    const [openEditPost, setOpenEditPost] = useState<boolean>(false);
    const [dataEditPost, setDataEditPost] = useState<IPost | null>(null);
    const [fetchTrigger, setFetchTrigger] = useState<number>(0)

    const { status, response, error } = useFetch<IPost[]>(`http://localhost:3000/posts?trigger=${fetchTrigger}`);

    if (status === FetchStatus.LOADING) return <CircularProgress />;
    if (status === FetchStatus.ERROR)
        return (
            <Typography variant="h5" color="error">
                {error}
            </Typography>
        );

    if (status === FetchStatus.SUCCESS && response) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
                <Box
                    sx={{
                        padding: '1rem',
                        backgroundColor: 'white',
                        borderRadius: '1rem',
                        width: '600px',
                    }}
                >
                    <Typography variant="h6" align="left">
                        New post
                    </Typography>
                    <AddPost action={ActionPostType.ADD_POST} setFetchTrigger={setFetchTrigger}/>
                </Box>
                <DialogWindow title="Edit post" open={openEditPost} setOpen={setOpenEditPost}>
                    <AddPost
                        action={ActionPostType.EDIT_POST}
                        setOpenEditPost={setOpenEditPost}
                        dataEditPost={dataEditPost}
                        setFetchTrigger={setFetchTrigger}
                    />
                </DialogWindow>
                {response.map((post: IPost) => (
                    <Post
                        key={post.id}
                        post={post}
                        setOpenEditPost={setOpenEditPost}
                        setDataEditPost={setDataEditPost}
                        setFetchTrigger={setFetchTrigger}
                    />
                ))}
            </Box>
        );
    }
};
