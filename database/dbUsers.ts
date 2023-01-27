import { db } from '@/database';
import User from '../models/User';
import bcrypt from 'bcryptjs';
export const checkUserEmailPassword = async (email: string = '', password: string = '') => {
    db.connect();
    const user = await User.findOne({ email });
    db.disconnect();

    if (!user) return null;

    if (!bcrypt.compareSync(password, user.password!)) return null;

    const { role, _id, name } = user;

    return {
        email: email.toLocaleLowerCase(),
        role,
        id: _id,
        name
    }
}