
export interface IOrder {
    _id: string;
    user?: string;
    orderItems: IOrderItem[];
    shippingAddress: shippingAddress;
    paymentResult?: string;

    numberOfItems: number;
    subtotal: number;
    tax: number;
    total: number;

    isPaid: boolean;
    paidAt: string;
}

export interface IOrderItem {
    _id: string;
    title: string;
    size: string;
    quantity: number;
    slug: string;
    image: string;
    price: number;
}

export interface shippingAddress {
    name: string,
    lastName: string,
    address: string,
    address2: string,
    cp: string,
    city: string
    phone: string,
    country: string
}