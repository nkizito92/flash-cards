import {createSlice} from '@reduxjs/toolkit'
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
            getCardsFailure: (state) => {
                state.isLoading = false;
            }
        }
    
});

export const { getCardsFetch, getCardsSuccess, getCardsFailure} = cardReducer.actions;

export default cardReducer;