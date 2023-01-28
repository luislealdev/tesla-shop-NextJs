import type { NextApiRequest, NextApiResponse } from 'next'

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

const createNewOrder = (req: NextApiRequest, res: NextApiResponse) => {
    return res.status(200).json({ message: 'Created' })
}