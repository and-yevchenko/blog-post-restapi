import { Send } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import './AddComment.css';
import { forwardRef } from 'react';

interface AddCommentProps {
    ref?: React.RefObject<HTMLFormElement>;
}

export const AddComment = forwardRef<HTMLFormElement, AddCommentProps>(( _, ref ) => {
    return (
        <form action="" className="add-comment">
            <TextField
                id="comment-field"
                label="Write a comment"
                variant="standard"
                fullWidth
                inputRef={ref as React.RefObject<HTMLInputElement>}
            />
            <IconButton aria-label="send">
                <Send color="primary" />
            </IconButton>
        </form>
    );
});
