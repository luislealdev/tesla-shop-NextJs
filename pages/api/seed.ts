import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedDatabase } from '../../database';
import { Product, User } from '../../models';
import Order from '../../models/Order';

type Data = { message: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    if (process.env.NODE_ENV === 'production') {
        return res.status(401).json({ message: 'No tiene acceso a este API' });
    }


    await db.connect();

    //Delete and add users
    await User.deleteMany();
    await User.insertMany(seedDatabase.initialData.users);

    //Delete and insert products
    await Product.deleteMany();
    await Product.insertMany(seedDatabase.initialData.products);

    //Delete orders
    await Order.deleteMany();


    await db.disconnect();

    res.status(200).json({ message: 'Proceso realizado correctamente' });
}