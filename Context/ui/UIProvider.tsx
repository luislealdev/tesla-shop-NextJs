import { FC, PropsWithChildren, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
    isMenuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
    isMenuOpen: false,
}

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    const toggleMenu = () => {
        dispatch({ type: '[UI] - toggleMenu' });
    }

    return (
        <UIContext.Provider value={{
            isMenuOpen: false,

            //Methods
            toggleMenu
        }}>
            {children}
        </UIContext.Provider>
    )
}