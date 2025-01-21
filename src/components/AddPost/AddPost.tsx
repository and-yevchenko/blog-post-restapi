import { Image } from '@mui/icons-material';
import { Alert, Box, Button, Snackbar, styled, TextField, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ActionPostType } from './_type';
import { IPost } from '../../api/utils/_type';
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
    setFetchTrigger: (value: number | ((prev: number) => number)) => void;
}

enum ImageNameStatus {
    INVALID_FILE = 'Invalid file',
    IMAGE_LOADED = 'Image loaded',
}

export const AddPost: React.FC<AddPostProps> = ({
    action,
    setOpenEditPost,
    dataEditPost,
    setDataEditPost,
    setFetchTrigger
}) => {
    const [imagePost, setImagePost] = useState<string | null>(null);
    const [isImageName, setIsImageName] = useState<string | boolean>(false);
    const [isValidForm, setIsValidForm] = useState<boolean>(false);
    const [snackbarSuccessPost, setSnackbarSuccessPost] = useState<boolean>(false);

    useEffect(() => {
        if (action === ActionPostType.EDIT_POST) {
            setIsImageName(dataEditPost?.image ? ImageNameStatus.IMAGE_LOADED : false);
            setImagePost(dataEditPost?.image ? dataEditPost.image : null)
        }
    }, [action, dataEditPost]);

    const validateFormPost = (textField: string) => {
        if (
            (!isImageName && textField.length < 1) || (isImageName === ImageNameStatus.INVALID_FILE && textField.length < 1)
        ) {
            return false;
        }
        return true;
    };

    const validateFile = (file: File) => {
        const allowedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
        if (file.size > 2097152 || !allowedFormats.includes(file.type)) {
            return false;
        }
        return true;
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!validateFile(file)) {
            setIsImageName(ImageNameStatus.INVALID_FILE);
            return;
        }
        setIsImageName(
            file.name.slice(0, file.name.lastIndexOf('.')).slice(0, 10) +
                `${file.name.length > 10 ? '...' + file.name.split('.').pop() : ''}`,
        );
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePost(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const publicationRequest = (textField: string) => {
        switch (action) {
            case ActionPostType.ADD_POST:
                sendApiRequest<IPost[]>('POST', `/posts`, {
                    id: uuid(8),
                    date: new Date().toISOString(),
                    author: 'rob.jones',
                    text: textField as string,
                    image: imagePost ? imagePost : null,
                }); //TODO ?answer?
                break;
            case ActionPostType.EDIT_POST:
                if (!dataEditPost) return;
                sendApiRequest<IPost[]>('PATCH', `/posts/${dataEditPost?.id}`, {
                    id: dataEditPost?.id,
                    date: new Date().toISOString(),
                    text: textField as string,
                    image: imagePost ? imagePost : null,
                });
                break;
            default:
                break;
        }
    };

    const deleteImage = () => {
        setIsImageName(false)
        setImagePost(null)
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const textField = formData.get('text-field');

        setIsValidForm(validateFormPost(textField as string));
        if (validateFormPost(textField as string)) {
            publicationRequest(textField as string);
        } else return;
                
        setFetchTrigger((prev) => prev + 1)
        if (setOpenEditPost) setOpenEditPost(false);
        if (setDataEditPost) setDataEditPost(null);
        if (imagePost) setImagePost(null);
        setIsImageName(false);
        setSnackbarSuccessPost(true);
        e.currentTarget.reset();
    };

    return (
        <>
            {action === ActionPostType.ADD_POST && (
                <Snackbar //TODO
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
            )}
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
                        <FileInput type="file" onChange={handleImageChange} multiple />
                    </Button>
                    {isImageName ? (
                        <Tooltip title="Сlick to delete" arrow>
                            <Typography
                                variant="caption"
                                color={
                                    isImageName === ImageNameStatus.INVALID_FILE
                                        ? 'error'
                                        : 'primary'
                                }
                                onClick={deleteImage}
                            >
                                {isImageName}
                            </Typography>
                        </Tooltip>
                    ) : (
                        <Typography variant="caption" color="textSecondary">
                            Max size: 2mb - Format: jpg, jpeg, png
                        </Typography>
                    )}
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        gap: '1rem',
                        marginTop: '1rem',
                    }}
                >
                    {!isValidForm && (
                        <Typography variant="caption" color="error">
                            Add text or images
                        </Typography>
                    )}
                    <Button variant="contained" color="primary" type="submit">
                        Publish
                    </Button>
                </Box>
            </form>
        </>
    );
};
