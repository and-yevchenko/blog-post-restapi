import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { BaseSyntheticEvent, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IPost } from '../../api/utils/_type';
import { sendApiRequest } from '../../api/utils/request';

interface MoreOptionsProps {
    post: IPost;
    setOpenEditPost: (value: boolean) => void;
    setDataEditPost: (value: IPost | null) => void;
    setFetchTrigger: (value: number | ((prev: number) => number)) => void;
}

const options = ['Edit', 'Remove']; //TODO

export const MoreOptions: React.FC<MoreOptionsProps> = ({
    post,
    setOpenEditPost,
    setDataEditPost,
    setFetchTrigger
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const onOpenOptions = (event: BaseSyntheticEvent) => {
        setAnchorEl(event.currentTarget);
    };

    const onClickOption = (e: BaseSyntheticEvent) => {
        setAnchorEl(null);
        console.log(e.target.innerText);
        if (e.target.innerText === 'Edit') {
            //TODO
            setOpenEditPost(true);
            setDataEditPost(post);
        } else if (e.target.innerText === 'Remove') {
            sendApiRequest<IPost[]>('DELETE', `/posts/${post.id}`)
                .then(() => {
                    console.log('post removed');
                })
                .catch((error) => {
                    console.log(error.message);
                });
            setFetchTrigger((prev) => prev + 1)
        }
    };

    return (
        <div className="more-options">
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={onOpenOptions}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{ 'aria-labelledby': 'long-button' }}
                anchorEl={anchorEl}
                open={open}
                onClose={onClickOption}
            >
                {options.map((option) => (
                    <MenuItem key={option} onClick={onClickOption}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};
