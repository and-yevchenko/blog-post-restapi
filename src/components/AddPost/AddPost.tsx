import { Image } from '@mui/icons-material';
import { Box, Button, styled, TextField, Typography } from '@mui/material';
import React from 'react';
import { ActionPostType } from './_type';
import { IPost } from '../../data/_type';
import { sendApiRequest } from '../../api/utils/request';
import { uuid } from '../../utils/uuid';

const FileInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

interface AddPostProps {
    action: ActionPostType;
    setOpenEditPost?: (value: boolean) => void;
    dataEditPost?: IPost | null;
    setDataEditPost?: (value: IPost | null) => void;
}

export const AddPost: React.FC<AddPostProps> = ({
    action,
    setOpenEditPost,
    dataEditPost,
    setDataEditPost,
}) => {
    const onPublish = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const textField = formData.get('text-field');

        switch (action) { //TODO
            case ActionPostType.ADD_POST:
                sendApiRequest<IPost[]>('POST', `/posts`, {
                    id: uuid(8),
                    date: new Date().toISOString(),
                    author: 'and.yevchenko',
                    text: textField as string,
                    image: 'witcher.jpg', //TODO
                });
                break;
            case ActionPostType.EDIT_POST: //TODO
                if (!dataEditPost) return;
                sendApiRequest<IPost[]>('PATCH', `/posts/${dataEditPost?.id}`, {
                    id: dataEditPost?.id,
                    date: new Date().toISOString(),
                    text: textField as string,
                    image: 'witcher.jpg', //TODO
                });
                if (setOpenEditPost) setOpenEditPost(false);
                if (setDataEditPost) setDataEditPost(null);
                break;
            default:
                break;
        }

        e.currentTarget.reset();
    };

    return (
        <form className="add-post" onSubmit={onPublish}>
            <TextField
                id="standard-multiline-static"
                name="text-field"
                label="Text of your post"
                multiline
                rows={3}
                variant="standard"
                fullWidth
                defaultValue={dataEditPost?.text}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                <Button component="label" role={undefined} tabIndex={-1} startIcon={<Image />}>
                    Upload image
                    <FileInput
                        type="file"
                        onChange={(event) => console.log(event.target.files)}
                        multiple
                        defaultValue={dataEditPost?.image}
                    />
                </Button>
                {/* TODO load image */}
                <Typography variant="caption" color="textSecondary">
                    Max size: 5mb
                </Typography>
            </Box>
            <Box
                sx={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}
            >
                <Button variant="contained" color="primary" type="submit">
                    Publish
                </Button>
            </Box>
        </form>
    );
};
