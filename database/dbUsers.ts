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

export const oAuthToDB = async (oAuthEmail: string, oAuthName: string) => {
    await db.connect();
    const user = await User.findOne({email: oAuthEmail });
    if (user) {
        await db.disconnect();
        const { email, name, role, _id } = user;
        return { email, name, role, _id };
    }

    const newUser = new User({ email: oAuthEmail, name: oAuthName, role: 'client', password: '@' });
    await newUser.save();
    await db.disconnect();

    const { email, name, role, _id } = newUser;
    
    return { email, name, role, _id };
}