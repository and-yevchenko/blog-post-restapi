import { Box, Checkbox, IconButton, Tooltip } from '@mui/material';
import {
    Bookmark,
    BookmarkBorder,
    ChatBubbleOutline,
    Favorite,
    FavoriteBorder,
} from '@mui/icons-material';
import React, { BaseSyntheticEvent } from 'react';
import { sendApiRequest } from '../../api/utils/request';
import { IPost } from '../../api/utils/_type';

interface PostPanelProps {
    post: IPost;
    focusElement?: React.RefObject<HTMLFormElement>;
}

export const PostPanel: React.FC<PostPanelProps> = ({ post, focusElement }) => {
    const handleLike = (e: BaseSyntheticEvent) => {
        //TODO
        if (e.target.checked) {
            sendApiRequest<IPost[]>('PATCH', `/posts/${post.id}`, {
                likes: [...(post.likes ?? []), post.author as string],
            });
        } else {
            sendApiRequest<IPost[]>('PATCH', `/posts/${post.id}`, {
                likes: post.likes ? post.likes.filter((like) => like !== post.author) : [],
            });
        }
    };

    const handleComment = () => {
        focusElement?.current?.focus();
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', padding: '0.5rem', gap: '0.5rem' }}>
            <Tooltip title="Like">
                <Checkbox
                    aria-label="like"
                    icon={<FavoriteBorder />}
                    checked={post.likes?.includes(post.author as string) ?? false}
                    checkedIcon={<Favorite sx={{ color: '#ff0000d3' }} />}
                    onChange={handleLike}
                />
            </Tooltip>
            <Tooltip title="Comment">
                <IconButton aria-label="comment" onClick={handleComment}>
                    <ChatBubbleOutline />
                </IconButton>
            </Tooltip>
            <Tooltip title="Favourites">
                <Checkbox
                    aria-label="favorites"
                    icon={<BookmarkBorder />}
                    checkedIcon={<Bookmark color="action" />}
                    sx={{ marginLeft: 'auto' }}
                />
            </Tooltip>
        </Box>
    );
};
