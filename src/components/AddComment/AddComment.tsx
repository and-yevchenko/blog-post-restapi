import { Send } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';

export const AddComment = () => {
    return (
        <form action="" className="add-comment">
            <TextField
                id="comment-field"
                label="Write a comment"
                variant="standard"
                fullWidth
            />
            <IconButton aria-label="send">
                <Send color="primary" />
            </IconButton>
        </form>
    );
};
