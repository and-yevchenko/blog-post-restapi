import { Image } from '@mui/icons-material';
import { Box, Button, styled, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
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

export const AddPost: React.FC<AddPostProps> = ({ action, setOpenEditPost, dataEditPost, setDataEditPost }) => {

    const [imagePost, setImagePost] = useState<string | null>(null)
    const [isImageName, setIsImageName] = useState<string | boolean>(false)
    const [isValidForm, setIsValidForm] = useState<boolean>(false)

    //TODO add func delete image when action === EDIT_POST

    useEffect(() => {
        if (action === ActionPostType.EDIT_POST) {
            setIsImageName(dataEditPost?.image ? "Image loaded" : false);
        }
    }, [])

    const validateFormPost = (textField: string) => {
        if (isImageName === false && textField.length < 1) {
            return false
        }
        return true
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setIsImageName(file.name) //TODO if name image large
        const reader = new FileReader();
        reader.onloadend = () => {
        setImagePost(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const onPublish = (textField: string) => {

        switch (action) { //TODO
            case ActionPostType.ADD_POST:
                sendApiRequest<IPost[]>('POST', `/posts`, {
                    id: uuid(8),
                    date: new Date().toISOString(),
                    author: 'and.yevchenko',
                    text: textField as string,
                    image: imagePost ? imagePost : null,
                });
                break;
            case ActionPostType.EDIT_POST:
                if (!dataEditPost) return;
                sendApiRequest<IPost[]>('PATCH', `/posts/${dataEditPost?.id}`, {
                    id: dataEditPost?.id,
                    date: new Date().toISOString(),
                    text: textField as string,
                    image: imagePost ?? dataEditPost.image,
                });
                break;
            default:
                break;
        }
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const textField = formData.get('text-field');

        setIsValidForm(validateFormPost(textField as string))
        if (validateFormPost(textField as string)) {
            onPublish(textField as string)
        } else return

        if (setOpenEditPost) setOpenEditPost(false);
        if (setDataEditPost) setDataEditPost(null);
        if (imagePost) setImagePost(null);
        setIsImageName(false)
        e.currentTarget.reset();
    }

    return (
        <form className="add-post" onSubmit={onSubmit}>
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
                        onChange={handleImageChange}
                        multiple
                    />
                </Button>
                {isImageName ? 
                    <Typography variant="caption" color="primary">{isImageName}</Typography>
                    : 
                    <Typography variant="caption" color="textSecondary">Max size: 2mb</Typography>
                }
            </Box>
            <Box
                sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}
            >
                {!isValidForm && <Typography variant="caption" color="error">Add text or images</Typography>}
                <Button variant="contained" color="primary" type="submit">
                    Publish
                </Button>
            </Box>
        </form>
    );
};
