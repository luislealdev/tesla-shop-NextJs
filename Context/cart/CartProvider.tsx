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

    const [state, dispatch] = useReducer(CartReducer, CART_INITIAL_STATE);

    const addProductToCart = (newProduct: ICartProduct) => {
        const isProductInCart = state.cart.some(p => p._id === newProduct._id && p.size === newProduct.size);
        if (!isProductInCart) return dispatch({ type: '[Cart] - updateItemsCart', payload: [...state.cart, newProduct] });

        const updatedProducts = state.cart.map(p => {
            if (p._id !== newProduct._id && p.size !== newProduct.size) return p;
            p.quantity += newProduct.quantity;
            return p;
        })

        dispatch({ type: '[Cart] - updateItemsCart', payload: updatedProducts });
    }

    return (
        <CartContext.Provider value={{
            ...state,

            //Methods
            addProductToCart
        }}>
            {children}
        </CartContext.Provider>
    )
}