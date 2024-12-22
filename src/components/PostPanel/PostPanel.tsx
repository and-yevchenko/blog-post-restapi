import { Box, Checkbox, IconButton, Tooltip } from '@mui/material';
import { Bookmark, BookmarkBorder, ChatBubbleOutline, Favorite, FavoriteBorder } from '@mui/icons-material';

export const PostPanel = () => {
    return (
        <Box
            sx={{ display: 'flex', alignItems: 'center', padding: '0.5rem', gap: '0.5rem' }}
        >
            <Tooltip title="Like">
                <Checkbox
                    aria-label="like"
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite sx={{ color: '#ff0000d3' }} />}
                />
            </Tooltip>
            <Tooltip title="Comment">
                <IconButton aria-label="comment">
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
