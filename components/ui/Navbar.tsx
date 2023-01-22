import NextLink from 'next/link';

import { AppBar, Badge, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UIContext } from '@/Context';

export const Navbar = () => {

    const { route } = useRouter();
    const { toggleMenu } = useContext(UIContext);

    
    return (
        <AppBar>
            <Toolbar>
                <NextLink href='/' passHref style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant='h6'>Teslo |</Typography>
                    <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                </NextLink>

                <Box flex={1} />

                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <NextLink href='/category/men' passHref>
                        <Button color={route == '/category/men' ? 'primary' : 'info'}>Hombres</Button>
                    </NextLink>
                    <NextLink href='/category/women' passHref>
                        <Button color={route == '/category/women' ? 'primary' : 'info'} >Mujeres</Button>
                    </NextLink>
                    <NextLink href='/category/kid' passHref>
                        <Button color={route == '/category/kid' ? 'primary' : 'info'}>Niños</Button>
                    </NextLink>
                </Box>


                <Box flex={1} />

                <IconButton>
                    <SearchOutlined />
                </IconButton>

                <NextLink href="/cart" passHref>
                    <IconButton>
                        <Badge badgeContent={2} color="secondary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </IconButton>
                </NextLink>


                <Button onClick={toggleMenu}>
                    Menú
                </Button>

            </Toolbar>
        </AppBar>
    )
}
