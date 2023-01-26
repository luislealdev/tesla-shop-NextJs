import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database';
import User from '../../../models/User';
import { jwt } from '@/utils';

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
        case 'GET':
            return validateToken(req, res);
        default:
            return res.status(400).json({ message: 'Bad Request' })
    }
}

const validateToken = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { token = '' } = req.cookies;

    let userId = '';

    try {
        userId = await jwt.isValidToken(token);
    } catch (error) {
        return res.status(401).json({ message: 'Auth token not valid' })
    }

    await db.connect();
    const user = await User.findById(userId);
    await db.disconnect();
    if (!user) return res.status(400).json({ message: 'User with that id doesnt exists' });

    const { _id, email, role, name } = user;

    res.status(200).json({
        token: jwt.signToken(_id, email),
        user: {
            email,
            role,
            name
        }
    })
}
