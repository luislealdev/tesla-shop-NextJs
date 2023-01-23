import { db } from './';

import { IProduct } from '../interfaces/products';
import Product from '../models/Product';


export const getProductBySlug = async (slug: string): Promise<IProduct | null> => {
    await db.connect();

    const product = await Product.findOne({ slug }).lean();

    await db.disconnect()

    if (!product) return null;

    return JSON.parse(JSON.stringify(product));
}

interface ProductsSlugs {
    slug: string
}
export const getAllProductsSlug = async (): Promise<ProductsSlugs[]> => {
    await db.connect();

    const slugs = await Product.find().select('slug -_id');

    await db.disconnect();

    return slugs;
}