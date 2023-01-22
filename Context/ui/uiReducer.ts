import { UIState } from './UIProvider';

type UIActionType = | { type: '[UI] - toggleMenu' }

export const uiReducer = (state: UIState, action: UIActionType): UIState => {

    switch (action.type) {
        case '[UI] - toggleMenu':
            return {
                ...state,
                isMenuOpen: !state.isMenuOpen
            }

        default:
            return state;
    }
}