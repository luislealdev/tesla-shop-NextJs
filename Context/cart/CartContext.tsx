import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';
import { shippingAddress } from '../../interfaces';


interface ContextProps {
    cart: ICartProduct[]
    isLoaded: boolean,

    numberOfItems: number,
    subTotal: number,
    tax: number,
    total: number,

    shippingAddress?: shippingAddress



    //Methods
    addProductToCart: (newProduct: ICartProduct) => void
    updateCartQuantity: (product: ICartProduct) => void
    removeCartProduct: (product: ICartProduct) => void
    updateAddress: (address: shippingAddress) => void
    createOrder: () => Promise<{ hasError: boolean; message: string }>

}

export const CartContext = createContext({} as ContextProps);