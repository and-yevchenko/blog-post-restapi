import { Image } from "@mui/icons-material";
import { Box, Button, styled, TextField, Typography } from "@mui/material"


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

export const AddPost = () => {

    return (
        <form className="add-post">
            <TextField
                id="standard-multiline-static"
                label="Text of your post"
                multiline
                rows={3}
                variant="standard"
                fullWidth
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                <Button
                    component="label"
                    role={undefined}
                    tabIndex={-1}
                    startIcon={<Image />}
                    >
                    Upload image
                    <FileInput
                        type="file"
                        onChange={(event) => console.log(event.target.files)}
                        multiple
                    />
                </Button>
                <Typography variant="caption" color="textSecondary">Max size: 5mb</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <Button variant="contained" color="primary" type="submit">Publish</Button>
            </Box>
        </form>
    )
}