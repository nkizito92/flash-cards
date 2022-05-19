import { createSlice } from '@reduxjs/toolkit'
export const cardReducer = createSlice({
    name: 'cards',
    initialState: {
        cards: [],
        isLoading: false
    },
    reducers: {
        getCardsFetch: (state) => {
            state.isLoading = true;
        },
        getCardsSuccess: (state, action) => {
            state.cards = action.payload;
            state.isLoading = false
        },
        newCardPost: (state, action) => {
            return {
                ...state, cards: [...state.cards, action.payload]
            }
        },
        updateCardSuccess: (state, action) => {
            const idx = state.cards.findIndex(card => card.id === Number(action.payload.id))
            const newState = [...state.cards]
            newState.splice(idx, 1, action.payload)
            return {
                ...state, cards: [...newState],
            }
        },
        deleteCardSuccess: (state, action) => {
            return {
                ...state, 
                cards: [...state.cards.filter(card => card.id !== Number(action.payload.id))]
            }
        },
        getCardsFailure: (state) => {
            state.isLoading = false;
        }
    }

});

export const { 
    getCardsFetch, 
    getCardsSuccess, 
    newCardPost, 
    updateCardSuccess, 
    deleteCardSuccess, 
    getCardsFailure 
} = cardReducer.actions;

export default cardReducer.reducer;