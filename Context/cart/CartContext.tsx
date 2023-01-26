import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';


interface ContextProps {
    cart: ICartProduct[]
    isLoaded: boolean,

    totalItems: number,
    subTotal: number,
    total: number

    //Methods
    addProductToCart: (newProduct: ICartProduct) => void
    updateProductQuantity: (product: ICartProduct) => void
    removeCartProduct: (product: ICartProduct) => void
}

export const CartContext = createContext({} as ContextProps);