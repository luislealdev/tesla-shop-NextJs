import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';


interface ContextProps {
    cart: ICartProduct[]

    //Methods
    addProductToCart: (newProduct: ICartProduct) => void
    updateProductQuantity: (product: ICartProduct) => void
}

export const CartContext = createContext({} as ContextProps);