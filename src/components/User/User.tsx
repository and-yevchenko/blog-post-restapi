import { Avatar, Link, Typography } from '@mui/material';

export const User = () => {

    return (
        <Link href='/' underline='none' color='inherit' sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Avatar alt="Andrii Yevchenko" src="/Andrii-Yevchenko.jpg" sx={{ width: 32, height: 32 }}/>
            <Typography variant='body1' fontWeight='600'>and.yevchenko</Typography>
        </Link>
    )
}