import { IOrder } from "@/interfaces";
import { isValidObjectId } from "mongoose";
import Order from '../models/Order';
import { db } from '@/database';

export const getOrderById = async (id: string): Promise<IOrder | null> => {
    if (!isValidObjectId(id)) return null;
    await db.connect();
    const order = await Order.findById(id).lean();
    await db.disconnect();
    if (!order) return null;

    return JSON.parse(JSON.stringify(order));
}

export const getOrdersById = async (id: string): Promise<IOrder[]> => {
    if (!isValidObjectId(id)) return [];
    await db.connect();
    const orders = await Order.find({ user: id }).lean();
    await db.disconnect();

    return JSON.parse(JSON.stringify(orders));
}