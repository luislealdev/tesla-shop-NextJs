import type { NextApiRequest, NextApiResponse } from 'next'
import Order from '../../../models/Order';
import User from '../../../models/User';
import Product from '../../../models/Product';
import { db } from '@/database';

type Data = {
    numberOfItems: number,
    paidOrders: number,
    numberOfClients: number,
    numberOfProducts: number,
    productsWithNoInventory: number,
    lowInventory: number
}

export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {
    await db.connect();

    const [
        numberOfItems,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
    ] = await Promise.all([
        Order.count(),
        Order.find({ isPaid: true }).count(),
        User.find({ role: 'client' }).count(),
        Product.count(),
        Product.find({ inStock: 0 }).count(),
        Product.find({ inStock: { $lte: 10 } }).count()
    ]
    )
    await db.disconnect();
    res.status(200).json({
        numberOfItems,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
    })
}