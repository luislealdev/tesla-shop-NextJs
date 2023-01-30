import { FC, useContext } from 'react';
import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Grid, Typography } from '@mui/material';

import { ItemCounter } from '../ui';
import { CartContext } from '../../Context/cart/CartContext';
import { ICartProduct } from '../../interfaces/cart';
import { IOrderItem } from '../../interfaces/order';

interface Props {
    editable?: boolean;
    products?: IOrderItem[];
}

export const CartList: FC<Props> = ({ editable = false, products }) => {

    const { cart, updateProductQuantity, removeCartProduct } = useContext(CartContext);

    const productsToShow = products ? products : cart;

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
                productsToShow.map(product => (
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
                                            maxValue={10}
                                            onUpdateQuantity={newQuantity => onUpdateQuantity(product as ICartProduct, newQuantity)}
                                        />
                                        : <Typography variant='h5'>{product.quantity} {product.quantity > 1 ? 'productos' : 'producto'}</Typography>
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                            <Typography variant='subtitle1'>{`$${product.price}`}</Typography>
                            {
                                editable && (
                                    <Button variant='text' color='secondary' onClick={() => onDeleteProduct(product as ICartProduct)}>
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
