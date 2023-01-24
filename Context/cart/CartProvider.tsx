import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { CartContext, CartReducer } from './';
import { ICartProduct } from '../../interfaces';
import Cookie from 'js-cookie';

export interface CartState {
    cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
    cart: [],
}

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(CartReducer, CART_INITIAL_STATE);

    useEffect(() => {
        try {
            const cookieCart = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];
            dispatch({ type: '[Cart] - loadCart from cookies | storage', payload: cookieCart })
        } catch (error) {
            dispatch({ type: '[Cart] - loadCart from cookies | storage', payload: [] })
        }

    }, [])

    useEffect(() => {
        if (state.cart.length > 0) Cookie.set('cart', JSON.stringify(state.cart))
    }, [state.cart])

    useEffect(() => {
        const totalItems = state.cart.reduce((prev, current) => current.quantity + prev, 0);
        const subTotal = state.cart.reduce((prev, current) => current.quantity * current.price + prev, 0);
        const taxes = (subTotal * Number(process.env.NEXT_PUBLIC_TAX_RATE)) || 0;

        const orderSummary = {
            totalItems,
            subTotal,
            total: subTotal + taxes
        }

        console.log(orderSummary);

    }, [state.cart])

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

    const updateProductQuantity = (product: ICartProduct) => {
        dispatch({ type: '[Cart] - updateProductQuantity', payload: product });
    }


    const removeCartProduct = (product: ICartProduct) => {
        dispatch({ type: '[Cart] - removeCartProduct', payload: product });
    }

    return (
        <CartContext.Provider value={{
            ...state,

            //Methods
            addProductToCart,
            updateProductQuantity,
            removeCartProduct
        }}>
            {children}
        </CartContext.Provider>
    )
}