import type { NextPage } from 'next';
import { Typography, Box } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import React from 'react';
import { ProductList } from '../../components/products';

import { GetServerSideProps } from 'next'
import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces/products';

interface Props {
    products: IProduct[],
    foundProducts: boolean,
    query: string
}

const SeachPage: NextPage<Props> = ({ products, foundProducts, query }) => {

    return (
        <ShopLayout title={'Teslo-Shop - Search'} pageDescription={'Encuentra los mejores productos de Teslo aquí'} >
            <Typography variant='h1' component='h1' > Buscar productos </Typography>
            {
                foundProducts
                    ?
                    <Box display='flex'>
                        <Typography variant='h2' sx={{ mb: 1 }}> Productos encontrados de </Typography>
                        <Typography variant='h2' sx={{ ml: 1 }} color='secondary'>{query}</Typography>
                    </Box>
                    :
                    <>
                        <Typography variant='h2' sx={{ mb: 1 }} color='secondary'>No se han encontrado productos de {query} </Typography>
                        <Typography variant='h2' sx={{ ml: 1 }}>Sugerencias: </Typography>
                    </>
            }

            <ProductList products={products} />

        </ShopLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { query = '' } = params as { query: string };

    if (query.length === 0) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    let products = await dbProducts.getProductsByTerm(query);
    const foundProducts = products.length > 0;

    if (!foundProducts) products = await dbProducts.getAllProducts();

    //TODO: retornar otros productos si no hay

    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
}

export default SeachPage;
