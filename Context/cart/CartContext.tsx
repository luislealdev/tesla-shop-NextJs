import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';
import { shippingAddress } from './CartProvider';


interface ContextProps {
    cart: ICartProduct[]
    isLoaded: boolean,

    totalItems: number,
    subTotal: number,
    total: number,

    shippingAddress?: shippingAddress



    //Methods
    addProductToCart: (newProduct: ICartProduct) => void
    updateProductQuantity: (product: ICartProduct) => void
    removeCartProduct: (product: ICartProduct) => void
}

export const CartContext = createContext({} as ContextProps);