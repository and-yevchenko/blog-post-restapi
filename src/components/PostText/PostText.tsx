import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';

interface PostTextProps {
    text: string;
    maxLength?: number;
}

export const PostText: React.FC<PostTextProps> = ({ text, maxLength = 100 }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const onReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Box sx={{ padding: '1rem' }} justifyItems="start">
            <Typography variant="body1" textAlign="start">
                {isExpanded ? text : `${text.substring(0, maxLength)}...`}
            </Typography>
            <Button
                variant="text"
                color="inherit"
                size="small"
                onClick={onReadMore}
            >
                {isExpanded ? 'Read less' : 'Read more'}
            </Button>
        </Box>
    );
};
