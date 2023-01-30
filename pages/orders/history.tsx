import NextLink from 'next/link';

import { Typography, Grid, Chip, Link } from '@mui/material';
import { DataGrid, GridColDef, GridValidRowModel } from '@mui/x-data-grid';
import { GetServerSideProps } from 'next'
import { dbOrders } from '@/database';
import { getSession } from 'next-auth/react';
import { FC } from 'react';
import { IOrder } from '../../interfaces/order';
import { ShopLayout } from '../../components/layouts';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullname', headerName: 'Nombre Completo', width: 300 },

    {
        field: 'paid',
        headerName: 'Pagada',
        description: 'Muestra información si está pagada la orden o no',
        width: 200,
        renderCell: (params: GridValidRowModel) => {
            return (
                params.row.paid
                    ? <Chip color="success" label="Pagada" variant='outlined' />
                    : <Chip color="error" label="No pagada" variant='outlined' />
            )
        }
    },
    {
        field: 'orden',
        headerName: 'Ver orden',
        width: 200,
        sortable: false,
        renderCell: (params: GridValidRowModel) => {
            return (
                <NextLink href={`/orders/${params.row.orderId}`} passHref style={{ textDecoration: 'underline' }}>
                    Ver orden
                </NextLink>
            )
        }
    }
];


// const rows = [
//     { id: 1, paid: true, fullname: 'Fernando Herrera' },
//     { id: 2, paid: false, fullname: 'Melissa Flores' },
//     { id: 3, paid: true, fullname: 'Hernando Vallejo' },
//     { id: 4, paid: false, fullname: 'Emin Reyes' },
//     { id: 5, paid: false, fullname: 'Eduardo Rios' },
//     { id: 6, paid: true, fullname: 'Natalia Herrera' },
// ]

interface Props {
    orders: IOrder[]
}

const HistoryPage: FC<Props> = ({ orders }) => {

    const rows = orders.map((order, index) => (
        { id: index + 1, paid: order.isPaid, fullname: `${order.shippingAddress.name} ${order.shippingAddress.lastName}`, orderId: order._id }
    ));

    return (
        <ShopLayout title={'Historial de ordenes'} pageDescription={'Historial de ordenes del cliente'}>
            <Typography variant='h1' component='h1'>Historial de ordenes</Typography>

            <Grid container>
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />

                </Grid>
            </Grid>

        </ShopLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session: any = await getSession({ req });

    if (!session) {
        return {
            redirect: {
                destination: '/auth/login?p=/orders/history',
                permanent: false
            }
        }
    }
    const orders = await dbOrders.getOrdersById(session.user._id);

    return {
        props: {
            orders
        }
    }
}

export default HistoryPage;