import { Box, Checkbox, IconButton, Tooltip } from '@mui/material';
import { Bookmark, BookmarkBorder, ChatBubbleOutline, Favorite, FavoriteBorder } from '@mui/icons-material';
import React from 'react';

interface PostPanelProps {
    likes?: Array<string>;
    author?: string;
    focusElement?: React.RefObject<HTMLFormElement>;
}

export const PostPanel: React.FC<PostPanelProps> = ({ likes, author, focusElement }) => {

    const handleComment = () => {
        focusElement?.current?.focus()
    }

    return (
        <Box
            sx={{ display: 'flex', alignItems: 'center', padding: '0.5rem', gap: '0.5rem' }}
        >
            <Tooltip title="Like">
                <Checkbox
                    aria-label="like"
                    icon={<FavoriteBorder />}
                    checked={likes?.includes(author as string)} //TODO
                    checkedIcon={<Favorite sx={{ color: '#ff0000d3' }} />}
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
