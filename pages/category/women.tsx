import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { useProducts } from '@/hooks';
import { Loading } from '@/components/ui';
import { ProductList } from '@/components/products';

const WomanPage: NextPage = () => {
    const { products, isLoading } = useProducts('/search/women');

    return (
        <ShopLayout title={'Teslo-Shop - Women'} pageDescription={'Encuentra los mejores productos de Teslo para mujeres'}>
            <Typography variant='h1' component='h1'>Mujeres</Typography>
            <Typography variant='h2' sx={{ mb: 1 }}>Productos para ellas</Typography>

            {
                isLoading
                    ?
                    <Loading />
                    :
                    <ProductList
                        products={products}
                    />
            }
        </ShopLayout>
    )
}

export default WomanPage;