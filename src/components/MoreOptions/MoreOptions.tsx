import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { BaseSyntheticEvent, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IPost } from '../../data/_type';
import { sendApiRequest } from '../../api/utils/request';

interface MoreOptionsProps {
    post: IPost;
    setOpenEditPost: (value: boolean) => void;
}

const options = ['Edit', 'Remove'];

export const MoreOptions: React.FC<MoreOptionsProps> = ({ post, setOpenEditPost }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const onOpenOptions = (event: BaseSyntheticEvent) => {
        setAnchorEl(event.currentTarget);
    };
    
    const onClickOption = (e: BaseSyntheticEvent) => {
        setAnchorEl(null);
        console.log(e.target.innerText);
        if (e.target.innerText === 'Edit') { //TODO
            setOpenEditPost(true);
        } else if (e.target.innerText === 'Remove') {
            sendApiRequest<IPost[]>('DELETE', `/posts/${post.id}`)
                .then(() => {
                    console.log('post removed');
                })
                .catch((error) => {
                    console.log(error.message);
                });
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
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={onClickOption}
            >
                {options.map((option) => (
                    <MenuItem
                        key={option}
                        onClick={onClickOption}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};
