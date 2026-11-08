import type { Action, State } from "./types";

export function reducer (state: State, action: Action) {
    switch(action.type) {
        case 'fetchSuccess':
            return { ...state, isLoading: false, error: null, cards: action.payload }
        case 'fetchError':
            return { ...state, isLoading: false, error: action.payload }
        case 'selectedCard':
            return { ...state, selectedCard: action.payload }
        case 'modalClose':
            return { ...state, selectedCard: null }
    }
}