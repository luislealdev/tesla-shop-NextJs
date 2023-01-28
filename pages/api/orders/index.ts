import type { NextApiRequest, NextApiResponse } from 'next'
import { IOrder } from '../../../interfaces/order';
import { getSession } from 'next-auth/react';
import { db, dbProducts } from '@/database';
import Product from '../../../models/Product';

type Data = {
    message: string
}

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return createNewOrder(req, res);

        default:
            return res.status(400).json({ message: 'Bad request' });
    }
}

const createNewOrder = async (req: NextApiRequest, res: NextApiResponse) => {
    const { orderItems, total } = req.body as IOrder;
    const session: any = await getSession();

    if (!session) return res.status(400).json({ message: 'Debe estar autenticado para hacer esto' });

    //Create array with the products the person wants
    const productsId = orderItems.map(product => product._id);
    await db.connect();

    const dbProducts = await Product.find({ _id: { $in: productsId } });
    try {
        const subTotal = orderItems.reduce((prev, current) => {
            const currentPrice = dbProducts.find(prod => prod._id === current._id)?.price;
            if (!currentPrice) throw new Error("Verifique el carrito de nuevo, producto inexistente.");

            return (current.price * current.quantity) + prev;
        }, 0);
    } catch (error) {

    }


    return res.status(200).json({ message: 'Created' })
}