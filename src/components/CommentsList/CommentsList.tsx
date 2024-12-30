import { List, ListItem, ListItemText, Typography } from "@mui/material"
import React from "react"
import { IComment } from "../../data/_type";

interface CommentsListProps {
    comments?: IComment[];
}

export const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {

    return (
        <List sx={{backgroundColor: '#fcfcfc', maxHeight: '100px', overflow: 'auto', scrollbarWidth: 'thin', scrollbarColor: 'gray transparent'}}>
            {comments?.map((comment: IComment) => (
                <ListItem key={comment.id} alignItems="flex-start" sx={{padding: '4px 16px'}}>
                    <ListItemText>
                        <Typography variant='body2' fontWeight='500'>{comment.nickname}</Typography>
                        <Typography variant='body2'>{comment.comment}</Typography>
                    </ListItemText>
                </ListItem>
            ))}
        </List>
    )
}