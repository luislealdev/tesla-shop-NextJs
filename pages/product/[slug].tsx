import { Box, Button, Grid, Typography, Chip } from '@mui/material';
import { NextPage, GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { ShopLayout } from '../../components/layouts';
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui/ItemCounter';
import { IProduct, ISize } from '../../interfaces/products';
import { db, dbProducts } from '@/database';
import { useState } from 'react';
import { ICartProduct } from '../../interfaces/cart';

interface Props {
  product: IProduct
}

const ProductPage: NextPage<Props> = ({ product }) => {

  const [tempCartItem, setTempCartItem] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
    inStock: product.inStock
  });

  const selectedSize = (size: ISize) => {
    setTempCartItem(currentProduct => ({
      ...currentProduct,
      size
    }))
  }

  const updateQuantity = (quantity: number) => {
    setTempCartItem(currentProduct => ({
      ...currentProduct,
      quantity
    }))
  }

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>

      <Grid container spacing={3}>

        <Grid item xs={12} sm={7}>
          <ProductSlideshow
            images={product.images}
          />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>

            {/* titulos */}
            <Typography variant='h1' component='h1'>{product.title}</Typography>
            <Typography variant='subtitle1' component='h2'>{`$${product.price}`}</Typography>

            {/* Cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Cantidad</Typography>
              <ItemCounter
                currentValue={tempCartItem.quantity}
                maxValue={tempCartItem.inStock}
                onUpdateQuantity={updateQuantity}
              />
              <SizeSelector
                selectedSize={tempCartItem.size}
                sizes={product.sizes}
                onSelectSize={selectedSize}
              />
            </Box>


            {
              product.inStock > 0 ? (
                <Button color="secondary" className='circular-btn'>
                  {
                    tempCartItem.size ? 'Agregar al carrito' : 'Seleccione una talla'
                  }
                </Button>
              ) : (
                <Chip label="No hay disponibles" color="error" variant='outlined' />
              )
            }

            {/* Descripción */}
            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle2'>Descripción</Typography>
              <Typography variant='body2'>{product.description}</Typography>
            </Box>

          </Box>
        </Grid>


      </Grid>

    </ShopLayout>
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


// export const getServerSideProps: GetServerSideProps = async ({ params }) => {

//   const { slug = '' } = params as { slug: string };
//   const product = await dbProducts.getProductBySlug(slug);


//   if (!product) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {
//       product
//     }
//   }
// }

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbProducts.getAllProductsSlug();

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug
      }
    })),
    fallback: 'blocking'
  }
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string }

  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 86400
  }
}

export default ProductPage;