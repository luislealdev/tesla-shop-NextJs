import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { useProducts } from '@/hooks';
import { Loading } from '@/components/ui';
import { ProductList } from '@/components/products';

const MenPage: NextPage = () => {
    const { products, isLoading } = useProducts('/search/men');

    return (
        <ShopLayout title={'Teslo-Shop - Men'} pageDescription={'Encuentra los mejores productos de Teslo para hombre'}>
            <Typography variant='h1' component='h1'>Hombres</Typography>
            <Typography variant='h2' sx={{ mb: 1 }}>Productos para ellos</Typography>

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

export default MenPage;