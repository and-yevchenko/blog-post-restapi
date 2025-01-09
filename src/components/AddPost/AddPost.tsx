import { Image } from '@mui/icons-material';
import { Alert, Box, Button, Snackbar, styled, TextField, Tooltip, Typography } from '@mui/material';
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

// TODO Decompose the logic

export const AddPost: React.FC<AddPostProps> = ({ action, setOpenEditPost, dataEditPost, setDataEditPost }) => {

    const [imagePost, setImagePost] = useState<string | null>(null)
    const [isImageName, setIsImageName] = useState<string | boolean>(false)
    const [isValidForm, setIsValidForm] = useState<boolean>(false)
    const [snackbarSuccessPost, setSnackbarSuccessPost] = useState<boolean>(false)

    useEffect(() => {
        if (action === ActionPostType.EDIT_POST) {
            setIsImageName(dataEditPost?.image ? "Image loaded" : false);
        }
    }, [])

    const validateFormPost = (textField: string) => {
        if (!isImageName || isImageName === 'Invalid file' && textField.length < 1) {
            return false
        }
        return true
    }

    const validateFile = (file: File) => {
        const allowedFormats = ["image/png", "image/jpeg", "image/jpg"];
        if (file.size > 2097152 || !allowedFormats.includes(file.type)) {
            return false
        }
        return true
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!validateFile(file)) {
            setIsImageName("Invalid file") //todo ts enum
            return
        }
        setIsImageName(file.name
                        .slice(0, file.name.lastIndexOf('.'))
                        .slice(0, 10) 
                        + `${file.name.length > 10 ? "..." + file.name.split('.').pop() : ""}`)
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
        setSnackbarSuccessPost(true)
        e.currentTarget.reset();
    }

    return (
        <>
            {action === ActionPostType.ADD_POST &&
                <Snackbar
                    open={snackbarSuccessPost}
                    autoHideDuration={5000}
                    onClose={() => setSnackbarSuccessPost(false)}
                >
                    <Alert
                        onClose={() => setSnackbarSuccessPost(false)}
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                        >
                        Here is a gentle confirmation that your action was successful.
                    </Alert>
                </Snackbar>
            }
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
                        <Tooltip title="Сlick to delete" arrow>
                            <Typography variant="caption" color="primary" onClick={() => setIsImageName(false)}>{isImageName}</Typography>
                        </Tooltip>
                        : 
                        <Typography variant="caption" color="textSecondary">Max size: 2mb - Format: jpg, jpeg, png</Typography>
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
        </>
    );
};
