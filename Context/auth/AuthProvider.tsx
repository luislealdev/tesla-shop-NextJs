import { FC, PropsWithChildren, useReducer } from 'react';
import { AuthContext, AuthReducer } from '.';
import { IUser } from '../../interfaces/user';
import tesloApi from '../../api/tesloApi';
import Cookies from 'js-cookie';

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

    return (
        <AuthContext.Provider value={{
            ...state,
            //Methods

            onLoginUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}