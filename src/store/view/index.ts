import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ToastType, ViewType } from './types';

export const initialState: ViewType = {
    toasts: [],
};

export const viewSlice = createSlice({
    name: 'view',
    initialState,
    reducers: {
        setToast: (state, action: PayloadAction<ToastType>) => {
            state.toasts = [...state.toasts, action.payload];
        },
        deleteToast: (state, action: PayloadAction<string>) => {
            state.toasts = state.toasts.filter((item) => item.text !== action.payload);
        },
    },
});

export const { setToast, deleteToast } = viewSlice.actions;
