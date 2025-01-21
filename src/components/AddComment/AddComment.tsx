import { Send } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import './AddComment.css';
import { forwardRef } from 'react';
import { IComment, IPost } from '../../api/utils/_type';
import { sendApiRequest } from '../../api/utils/request';
import { uuid } from '../../utils/uuid';

interface AddCommentProps {
    post: IPost;
    setFetchTrigger: (value: number | ((prev: number) => number)) => void;
    ref?: React.RefObject<HTMLFormElement>;
}

export const AddComment = forwardRef<HTMLFormElement, AddCommentProps>(({ post, setFetchTrigger }, ref) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = formData.get('comment-field');
        sendApiRequest<IPost[]>('PATCH', `/posts/${post.id}`, {
            comments: [
                ...(post.comments ?? []),
                {
                    comment: data,
                    nickname: post.author,
                    id: uuid(8),
                } as IComment,
            ],
        });
        setFetchTrigger((prev) => prev + 1)
        e.currentTarget.reset();
    };

    return (
        <form onSubmit={handleSubmit} className="add-comment">
            <TextField
                name="comment-field"
                id="comment-field"
                label="Write a comment"
                variant="standard"
                fullWidth
                inputRef={ref as React.RefObject<HTMLInputElement>}
            />
            <IconButton aria-label="send" type="submit">
                <Send color="primary" />
            </IconButton>
        </form>
    );
});
