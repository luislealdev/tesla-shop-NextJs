import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { CartContext, CartReducer } from './';
import { ICartProduct } from '../../interfaces';
import Cookie from 'js-cookie';
import Cookies from 'js-cookie';
import { shippingAddress } from '../../interfaces';
import tesloApi from '../../api/tesloApi';

export interface CartState {
    cart: ICartProduct[];
    isLoaded: boolean,

    totalItems: number,
    subTotal: number,
    total: number,

    shippingAddress?: shippingAddress
}

const CART_INITIAL_STATE: CartState = {
    cart: [],
    isLoaded: false,

    totalItems: 0,
    subTotal: 0,
    total: 0,

    shippingAddress: undefined

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
    }, [state.cart]);

    useEffect(() => {
        if (Cookies.get('name')) {
            const address = {
                name: Cookies.get('name') || '',
                lastName: Cookies.get('lastName') || '',
                address: Cookies.get('address') || '',
                address2: Cookies.get('address2') || '',
                cp: Cookies.get('cp') || '',
                city: Cookies.get('city') || '',
                phone: Cookies.get('phone') || '',
                country: Cookies.get('country') || ''
            }
            dispatch({ type: '[Cart] - load address from cookies', payload: address });
        }
    }, [])

    useEffect(() => {
        const totalItems = state.cart.reduce((prev, current) => current.quantity + prev, 0);
        const subTotal = state.cart.reduce((prev, current) => current.quantity * current.price + prev, 0);
        const taxes = (subTotal * Number(process.env.NEXT_PUBLIC_TAX_RATE)) || 0;

        const orderSummary = {
            totalItems,
            subTotal,
            total: subTotal + taxes
        }

        dispatch({ type: '[Cart] - updateCartSummary', payload: orderSummary })
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

    const updateAddress = (address: shippingAddress) => {
        Cookies.set('name', address.name);
        Cookies.set('lastName', address.lastName);
        Cookies.set('address', address.address);
        Cookies.set('address2', address.address2);
        Cookies.set('cp', address.cp);
        Cookies.set('city', address.city);
        Cookies.set('phone', address.phone);
        Cookies.set('country', address.country);

        dispatch({ type: '[Cart] - update address', payload: address });
    }

    const createOrder = async () => {
        try {
            const { data } = await tesloApi.post('/orders');
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <CartContext.Provider value={{
            ...state,

            //Methods
            addProductToCart,
            updateProductQuantity,
            removeCartProduct,
            updateAddress,
            createOrder
        }}>
            {children}
        </CartContext.Provider>
    )
}