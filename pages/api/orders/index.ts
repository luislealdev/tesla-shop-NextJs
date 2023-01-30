import type { NextApiRequest, NextApiResponse } from 'next'
import { IOrder } from '../../../interfaces/order';
import { getSession } from 'next-auth/react';
import { db } from '@/database';
import Product from '../../../models/Product';
import Order from '../../../models/Order';

type Data = { message: string } | IOrder

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

    const session: any = await getSession({ req });

    if (!session) return res.status(400).json({ message: 'Debe estar autenticado para hacer esto' });

    //Create array with the products the person wants
    const productsIds = orderItems.map(product => product._id);
    await db.connect();
    const dbProducts = await Product.find({ _id: { $in: productsIds } });

    try {
        const subTotal = orderItems.reduce((prev, current) => {
            const currentPrice = dbProducts.find(prod => prod.id === current._id)?.price;
            if (!currentPrice) throw new Error("Verifique el carrito de nuevo, producto inexistente.");
            return (current.price * current.quantity) + prev;
        }, 0);

        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
        const backendTotal = subTotal * (taxRate + 1);

        if (total !== backendTotal) throw new Error("Los totales no cuadran");

        const userId = session.user._id;

        const newOrder = new Order({ ...req.body, isPaid: false, user: userId });

        newOrder.total = Math.round(newOrder.total * 100) / 100;

        await newOrder.save();
        db.disconnect();


        return res.status(201).json(newOrder);

    } catch (error: any) {
        await db.disconnect();
        console.log(error);
        res.status(400).json({
            error: error.message || 'Revise los logs de la aplicación'
        })

    }



    return res.status(200).json({ message: 'Created' })
}