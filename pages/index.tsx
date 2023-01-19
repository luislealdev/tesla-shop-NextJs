import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import useSWR from 'swr'

import { ShopLayout } from '../components/layouts';
import { ProductList } from '../components/products';

const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json())

const Home: NextPage = () => {
  const { data, error, isLoading } = useSWR('/api/products', fetcher);
  console.log(data);


  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Encuentra los mejores productos de Teslo aquí'}>
      <Typography variant='h1' component='h1'>Tienda</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>Todos los productos</Typography>

      <ProductList
        products={data as any}
      />


    </ShopLayout>
  )
}

export default Home
