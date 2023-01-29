import { IOrder } from "@/interfaces";
import Order from '../models/Order';

export const getOrderById = async (id: string): Promise<IOrder | null> => {
    const order = await Order.findById(id).lean();

    if (!order) return null;

    return JSON.parse(JSON.stringify(order));
}