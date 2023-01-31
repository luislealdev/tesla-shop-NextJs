import { useContext } from 'react';
import NextLink from 'next/link';

import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { UIContext } from '../../Context/ui';

export const AdminNavbar = () => {

    const { toggleMenu } = useContext(UIContext);

    return (
        <AppBar>
            <Toolbar>
                <NextLink href='/' passHref>
                    <Box display='flex' alignItems='center'>
                        <Typography variant='h6'>Teslo |</Typography>
                        <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                    </Box>
                </NextLink>

                <Box flex={1} />

                <Button onClick={toggleMenu}>
                    Menú
                </Button>

            </Toolbar>
        </AppBar>
    )
}