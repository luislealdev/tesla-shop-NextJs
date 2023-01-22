import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { useProducts } from '@/hooks';
import { Loading } from '@/components/ui';
import { ProductList } from '@/components/products';

const KidPage: NextPage = () => {
    const { products, isLoading } = useProducts('/search/kid');

    return (
        <ShopLayout title={'Teslo-Shop - Kid'} pageDescription={'Encuentra los mejores productos de Teslo para niño'}>
            <Typography variant='h1' component='h1'>Niños</Typography>
            <Typography variant='h2' sx={{ mb: 1 }}>Productos para los pequeños de la casa</Typography>

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

export default KidPage;
