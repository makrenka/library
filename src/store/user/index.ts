import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
    ResponseUser,
    ResponseUsersList,
    UpdateUserActionType,
    UploadAvatarActionType,
    UserBooking,
    UserDelivery,
    UserHistory,
    UserStateType,
} from './types';

export const initialState: UserStateType = {
    isLoading: false,
    isSuccess: false,
    isUpdateSuccess: false,
    isUpdateLoading: false,
    isUpdateError: false,
    isError: false,
    data: {} as ResponseUser,
    userForAdmin: {} as ResponseUser,
    usersList: {
        data: null,
    },
};

const initialBooking = {
    book: null,
    dateOrder: null,
    id: null,
    order: null,
};

const initialDelivery = {
    id: null,
    handed: null,
    dateHandedFrom: null,
    dateHandedTo: null,
    book: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        usersListRequest: (state) => {
            state.isLoading = true;
        },
        usersListRequestSuccess: (state, action: PayloadAction<ResponseUsersList[]>) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.usersList.data = action.payload;
        },
        usersListRequestError: (state) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        },
        userRequest: (state, action: PayloadAction<string>) => {
            state.isLoading = true;
        },
        userRequestSuccess: (state, action: PayloadAction<ResponseUser>) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.data = action.payload;
        },
        userRequestError: (state) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        },
        userForAdminRequest: (state, action: PayloadAction<string>) => {
            state.isLoading = true;
        },
        userForAdminRequestSuccess: (state, action: PayloadAction<ResponseUser>) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.userForAdmin = action.payload;
        },
        resetUserForAdmin: (state) => {
            state.userForAdmin = {} as ResponseUser;
        },
        authenticatedUserRequest: (state) => {
            state.isLoading = true;
        },
        authenticatedUserSuccess: (state, action: PayloadAction<ResponseUser>) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.data = action.payload;
        },        
        updateUserRequest: (state, action: PayloadAction<UpdateUserActionType>) => {
            state.isUpdateLoading = true;
        },
        updateUserSuccess: (state, action: PayloadAction<ResponseUser>) => {
            state.isUpdateLoading = false;
            state.isUpdateError = false;
            state.isUpdateSuccess = true;
            state.data = action.payload;
        },
        uploadAvatarRequest: (state, action: PayloadAction<UploadAvatarActionType>) => {
            state.isLoading = true;
        },
        uploadAvatarSuccess: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            // state.data = action.payload;
        },
        blockUserRequest: (state, action: PayloadAction<number | string>) => {
            state.isLoading = true;
        },
        blockUserRequestSuccess: (state, action: PayloadAction<ResponseUser>) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.data = action.payload;
        },
        blockUserRequestError: (state) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        },
        unblockUserRequest: (state, action: PayloadAction<number | string>) => {
            state.isLoading = true;
        },
        unblockUserRequestSuccess: (state, action: PayloadAction<ResponseUser>) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.data = action.payload;
        },
        unblockUserRequestError: (state) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        },
        deleteBookingUpdateUser: (state) => {
            state.data.booking = initialBooking as UserBooking;
        },
        addBookingUpdateUser: (state, action: PayloadAction<UserBooking>) => {
            state.data.booking = action.payload;
        },
        deleteDeliveryUpdateUser: (state) => {
            state.data.delivery = initialDelivery as UserDelivery;
        },
        addDeliveryUpdateUser: (state, action: PayloadAction<UserDelivery>) => {
            state.data.delivery = action.payload;
        },
        addHistoryUpdateUser: (state, action: PayloadAction<UserHistory>) => {
            state.data.history = action.payload;
        },
    },
});

export const {
    usersListRequest,
    usersListRequestSuccess,
    usersListRequestError,
    userRequest,
    userRequestSuccess,
    userRequestError,
    userForAdminRequest,
    userForAdminRequestSuccess,
    resetUserForAdmin,
    authenticatedUserRequest,
    authenticatedUserSuccess,
    updateUserRequest,
    updateUserSuccess,
    uploadAvatarRequest,
    uploadAvatarSuccess,
    deleteBookingUpdateUser,
    deleteDeliveryUpdateUser,
    addBookingUpdateUser,
    addDeliveryUpdateUser,
    addHistoryUpdateUser,
    blockUserRequest,
    blockUserRequestSuccess,
    blockUserRequestError,
    unblockUserRequest,
    unblockUserRequestSuccess,
    unblockUserRequestError,
} = userSlice.actions;
