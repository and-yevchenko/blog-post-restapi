import { List, ListItem, ListItemText, Typography } from "@mui/material"

export const CommentsList = () => {

    return (
        <List sx={{backgroundColor: '#fcfcfc', maxHeight: '100px', overflow: 'auto', scrollbarWidth: 'thin', scrollbarColor: 'gray transparent'}}>
            <ListItem alignItems="flex-start" sx={{padding: '4px 16px'}}>
                <ListItemText>
                    <Typography variant='body2' fontWeight='500'>and.yevchenko</Typography>
                    <Typography variant='body2'>Lorem ipsum dolor sit amet.</Typography>
                </ListItemText>
            </ListItem>
        </List>
    )
}