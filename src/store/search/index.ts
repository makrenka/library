import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SearchParams } from './types';

export const initialState: SearchParams = {
    filter: '',
    isSortedDesc: true,
    isSortingByRating: true,
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchbookList: (state, action: PayloadAction<string>) => {
            state.filter = action.payload;
        },
        setSortMethodRatingDecr: (state) => {
            state.isSortedDesc = true;
            state.isSortingByRating = true;
        },
        setSortMethodRatingIncr: (state) => {
            state.isSortedDesc = false;
            state.isSortingByRating = true;
        },
        setSortMethodAlphDecr: (state) => {
            state.isSortedDesc = true;
            state.isSortingByRating = false;
        },
        setSortMethodAlphIncr: (state) => {
            state.isSortedDesc = false;
            state.isSortingByRating = false;
        },
    },
});

export const {
    searchbookList,
    setSortMethodRatingDecr,
    setSortMethodRatingIncr,
    setSortMethodAlphDecr,
    setSortMethodAlphIncr,
} = searchSlice.actions;
