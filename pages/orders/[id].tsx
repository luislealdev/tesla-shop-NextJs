import { Box, Card, CardContent, Divider, Grid, Typography, Chip } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart';

import { GetServerSideProps, NextPage } from 'next';
import { dbOrders } from '@/database';
import { getSession } from 'next-auth/react';
import { IOrder } from '../../interfaces/order';

import { PayPalButtons } from "@paypal/react-paypal-js";

interface Props {
    order: IOrder
}

const OrderPage: NextPage<Props> = ({ order }) => {
    const { shippingAddress } = order;

    return (
        <ShopLayout title='Resumen de la orden' pageDescription={'Resumen de la orden'}>
            <Typography variant='h1' component='h1'>Orden: {order._id}</Typography>

            {order.isPaid
                ?
                <Chip
                    sx={{ my: 2 }}
                    label="Orden ya fue pagada"
                    variant='outlined'
                    color="success"
                    icon={<CreditScoreOutlined />}
                />
                :
                <Chip
                    sx={{ my: 2 }}
                    label="Pendiente de pago"
                    variant='outlined'
                    color="error"
                    icon={<CreditCardOffOutlined />}
                />
            }

            <Grid container className='fadeIn'>
                <Grid item xs={12} sm={7}>
                    <CartList products={order.orderItems} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Resumen ({order.numberOfItems} {order.numberOfItems > 1 ? 'productos' : 'producto'})</Typography>
                            <Divider sx={{ my: 1 }} />

                            <Typography>{shippingAddress.name} {shippingAddress.lastName}</Typography>
                            <Typography>{shippingAddress.address}</Typography>
                            <Typography>{shippingAddress.address2} {shippingAddress.city} {shippingAddress.cp}</Typography>
                            <Typography>{shippingAddress.country}</Typography>
                            <Typography>{shippingAddress.phone}</Typography>

                            <Divider sx={{ my: 1 }} />

                            <OrderSummary summaryValues={{
                                numberOfItems: order.numberOfItems,
                                subTotal: order.subTotal,
                                tax: order.tax,
                                total: order.total
                            }} />

                            <Box sx={{ mt: 3 }}>
                                {order.isPaid ?
                                    <Chip
                                        sx={{ my: 2 }}
                                        label="Orden ya fue pagada"
                                        variant='outlined'
                                        color="success"
                                        icon={<CreditScoreOutlined />}
                                    />
                                    :
                                    <PayPalButtons
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                                purchase_units: [
                                                    {
                                                        amount: {
                                                            currency_code: 'USD',
                                                            value: `${order.total}`,
                                                        },
                                                    },
                                                ],
                                            });
                                        }}
                                        onApprove={(data, actions) => {
                                            return actions.order!.capture().then((details) => {
                                                const name = details.payer.name!.given_name;

                                            });
                                        }}
                                    />
                                }
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>


        </ShopLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const { id = '' } = query;
    const session: any = await getSession({ req });

    if (!session) return {
        redirect: {
            destination: `/auth/login?p=/orders/${id}`,
            permanent: false
        }
    }
    const order = await dbOrders.getOrderById(id.toString());

    if (!order) return {
        redirect: {
            destination: `/orders/history`,
            permanent: false
        }
    }

    if (order.user !== session.user._id) return {
        redirect: {
            destination: `/orders/history`,
            permanent: false
        }
    }

    return {
        props: {
            order
        }
    }
}

export default OrderPage;