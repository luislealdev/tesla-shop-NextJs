import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

type Data =
    | { message: string }
    | {
        token: string,
        user: {
            email: string,
            role: string,
            name: string
        }
    }

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return loginUser(req, res);
        default:
            return res.status(400).json({ message: 'Bad Request' })
    }
    // res.status(200).json({ name: 'Example' })
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { email, password } = req.body;
    await db.connect();
    const user = await User.findOne({ email });
    await db.disconnect()

    if (!user) return res.status(400).json({ message: 'Correo o contraseña invalidos - correo' });

    if (!bcrypt.compareSync(password, user.password!)) return res.status(400).json({ message: 'Correo o contraseña invalidos - contraseña' });

    const { role, name } = user;
    return res.status(200).json({
        token: '',
        user: { email, role, name }
    })
}
