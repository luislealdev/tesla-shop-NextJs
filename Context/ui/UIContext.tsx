import { createContext } from 'react';


interface ContextProps {
    isMenuOpen: boolean,

    //Methods
    toggleMenu: () => void;
}

export const UIContext = createContext({} as ContextProps);