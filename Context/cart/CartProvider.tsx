import { FC, PropsWithChildren, useReducer } from 'react';
import { CartContext, CartReducer } from './';
import { ICartProduct } from '../../interfaces';

export interface CartState {
    cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
    cart: [],
}

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(CartReducer, CART_INITIAL_STATE)

    return (
        <CartContext.Provider value={{
            ...state
        }}>
            {children}
        </CartContext.Provider>
    )
}