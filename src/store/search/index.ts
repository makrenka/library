import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SearchParams } from './types';

export const initialState: SearchParams = {
    filter: '',
    isSortedDesc: true,
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchbookList: (state, action: PayloadAction<string>) => {
            state.filter = action.payload;
        },
        setSortMethod: (state) => {
            state.isSortedDesc = !state.isSortedDesc;
        },
    },
});

export const { searchbookList, setSortMethod } = searchSlice.actions;
