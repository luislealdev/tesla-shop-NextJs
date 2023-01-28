import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';
import { shippingAddress } from '../../interfaces';


interface ContextProps {
    cart: ICartProduct[]
    isLoaded: boolean,

    totalItems: number,
    subTotal: number,
    taxes: number,
    total: number,

    shippingAddress?: shippingAddress



    //Methods
    addProductToCart: (newProduct: ICartProduct) => void
    updateProductQuantity: (product: ICartProduct) => void
    removeCartProduct: (product: ICartProduct) => void
    updateAddress: (address: shippingAddress) => void
    createOrder: () => void

}

export const CartContext = createContext({} as ContextProps);