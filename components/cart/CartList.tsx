import { FC, useContext } from 'react';
import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Grid, Typography } from '@mui/material';

import { ItemCounter } from '../ui';
import { CartContext } from '../../Context/cart/CartContext';
import { ICartProduct } from '../../interfaces/cart';

interface Props {
    editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {

    const { cart, updateProductQuantity, removeCartProduct } = useContext(CartContext);

    const onUpdateQuantity = (product: ICartProduct, newQuantity: number) => {
        product.quantity = newQuantity;
        updateProductQuantity(product);
    }

    const onDeleteProduct = (product: ICartProduct) => {
        removeCartProduct(product);
    }

    return (
        <>
            {
                cart.map(product => (
                    <Grid container spacing={2} key={product.slug + product.size} sx={{ mb: 1 }}>
                        <Grid item xs={3}>
                            <NextLink href={`/product/${product.slug}`} passHref>
                                <CardActionArea>
                                    <CardMedia
                                        image={`/products/${product.image}`}
                                        component='img'
                                        sx={{ borderRadius: '5px' }}
                                    />
                                </CardActionArea>
                            </NextLink>
                        </Grid>
                        <Grid item xs={7}>
                            <Box display='flex' flexDirection='column'>
                                <Typography variant='body1'>{product.title}</Typography>
                                <Typography variant='body1'>Talla: <strong>{product.size}</strong></Typography>

                                {
                                    editable
                                        ? <ItemCounter
                                            currentValue={product.quantity}
                                            maxValue={product.inStock}
                                            onUpdateQuantity={newQuantity => onUpdateQuantity(product, newQuantity)}
                                        />
                                        : <Typography variant='h5'>{product.quantity} {product.quantity > 1 ? 'productos' : 'producto'}</Typography>
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                            <Typography variant='subtitle1'>{`$${product.price}`}</Typography>
                            {
                                editable && (
                                    <Button variant='text' color='secondary' onClick={() => onDeleteProduct(product)}>
                                        Remover
                                    </Button>
                                )
                            }
                        </Grid>
                    </Grid>
                ))
            }
        </>
    )
}
