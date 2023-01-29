import NextLink from 'next/link';

import { Box, Button, Card, CardContent, Chip, Divider, Grid, Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/cart/CartContext';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';


const SummaryPage = () => {

    const router = useRouter();

    const { shippingAddress, createOrder } = useContext(CartContext);
    const [isPosting, setIsPosting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!Cookies.get('name')) {
            router.push('/checkout/address');
        }
    }, [Cookies, router]);

    useEffect(() => {
        if (!Cookies.get('cart')) {
            router.push('/');
        }
    }, [Cookies, router]);


    if (!shippingAddress) return (<></>);

    const onOrder = async () => {
        setIsPosting(true);
        const { hasError, message } = await createOrder();

        if (hasError) {
            setIsPosting(false);
            setErrorMessage(message);
        }

        router.replace(`/orders/${message}`);
    }

    return (
        <ShopLayout title='Resumen de orden' pageDescription={'Resumen de la orden'}>
            <Typography variant='h1' component='h1'>Resumen de la orden</Typography>

            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Resumen (3 productos)</Typography>
                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Dirección de entrega</Typography>
                                <NextLink href='/checkout/address' passHref style={{ textDecoration: 'underline' }}>
                                    Editar
                                </NextLink>
                            </Box>


                            <Typography>{shippingAddress.name} {shippingAddress.lastName}</Typography>
                            <Typography>{shippingAddress.address} {shippingAddress?.address2 || ''}</Typography>
                            <Typography>{shippingAddress.city}, {shippingAddress.cp}  </Typography>
                            {/* <Typography>{countries.find(c => c.code === shippingAddress.country)?.name}</Typography> */}
                            <Typography>{shippingAddress.country}</Typography>
                            <Typography>{shippingAddress.phone} </Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='end'>
                                <NextLink href='/cart' passHref style={{ textDecoration: 'underline' }}>
                                    Editar
                                </NextLink>
                            </Box>

                            <OrderSummary />

                            <Box sx={{ mt: 3 }}>
                                <Button color="secondary" className='circular-btn' fullWidth onClick={onOrder} disabled={isPosting}>
                                    Confirmar Orden
                                </Button>
                                {
                                    errorMessage && <Chip color="error" label={errorMessage} sx={{ width: '100%', mt: 2 }} />
                                }
                            </Box>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>


        </ShopLayout>
    )
}

export default SummaryPage;