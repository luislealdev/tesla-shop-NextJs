import { FC, PropsWithChildren, useReducer, useEffect } from 'react';
import { AuthContext, AuthReducer } from '.';
import { IUser } from '../../interfaces/user';
import tesloApi from '../../api/tesloApi';
import Cookies from 'js-cookie';
import axios from 'axios';

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser,
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(AuthReducer, AUTH_INITIAL_STATE)

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async () => {
        try {
            const { data } = await tesloApi.get('/user/validate-token');
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - login', payload: user });
        } catch (error) {
            Cookies.set('token', '');
        }
    }


    const onLoginUser = async (email: string, password: string) => {
        try {
            const { data } = await tesloApi.post('/user/login', { email, password });
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - login', payload: user });
            return true;
        } catch (error) {
            return false;
        }
    }

    const onRegisterUser = async (name: string, email: string, password: string): Promise<{ hasError: boolean, message?: string }> => {
        try {
            const { data } = await tesloApi.post('/user/register', { name, email, password });
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - login', payload: user });
            return {
                hasError: false
            };
        } catch (error) {
            if (axios.isAxiosError(error)) return {
                hasError: true,
                message: error.response?.data.message
            };

            return {
                hasError: true,
                message: 'No se ha podido crear el usuario, intente de nuevo'
            }
        }
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            //Methods

            onLoginUser,
            onRegisterUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}