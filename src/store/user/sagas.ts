import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { axiosInstance } from '../../api/axios';
import { FILE_UPLOAD, USERS_BLOCKING, USERS_URL } from '../../constants/api';
import { ERROR } from '../../constants/errors';
import { TOAST } from '../../constants/toast';
import { MESSAGES } from '../../constants/toast-messages';
import { setToast } from '../view';

import {
    FileUploadResponseType,
    ResponseUser,
    ResponseUsersList,
    UpdateUserActionType,
    UploadAvatarActionType,
} from './types';
import {
    authenticatedUserRequest,
    authenticatedUserSuccess,
    blockUserRequest,
    blockUserRequestError,
    blockUserRequestSuccess,
    unblockUserRequest,
    unblockUserRequestError,
    unblockUserRequestSuccess,
    updateUserRequest,
    updateUserSuccess,
    uploadAvatarRequest,
    uploadAvatarSuccess,
    userForAdminRequest,
    userForAdminRequestSuccess,
    userRequest,
    userRequestError,
    userRequestSuccess,
    usersListRequest,
    usersListRequestError,
    usersListRequestSuccess,
} from '.';

function* usersListRequestWorker() {
    try {
        const { data }: AxiosResponse<ResponseUsersList[]> = yield call(
            axiosInstance.get,
            USERS_URL.user,
        );

        yield put(usersListRequestSuccess(data));
    } catch {
        yield put(usersListRequestError());
        yield put(setToast({ type: TOAST.error, text: ERROR.users }));
    }
}

function* userRequestWorker({ payload }: PayloadAction<string>) {
    try {
        const { data }: AxiosResponse<ResponseUser> = yield call(
            axiosInstance.get,
            `${USERS_URL.user}/${payload}`,
        );

        yield put(userRequestSuccess(data));
    } catch {
        yield put(userRequestError());
        yield put(setToast({ type: TOAST.error, text: ERROR.profile }));
    }
}

function* userForAdminRequestWorker({ payload }: PayloadAction<string>) {
    try {
        const { data }: AxiosResponse<ResponseUser> = yield call(
            axiosInstance.get,
            `${USERS_URL.user}/${payload}`,
        );

        yield put(userForAdminRequestSuccess(data));
    } catch {
        yield put(userRequestError());
        yield put(setToast({ type: TOAST.error, text: ERROR.profile }));
    }
}

function* getAuthenticatedUserWorker() {
    try {
        const { data }: AxiosResponse<ResponseUser> = yield call(
            axiosInstance.get,
            `${USERS_URL.user}/me`,
        );

        yield put(authenticatedUserSuccess(data));
    } catch {
        yield put(userRequestError());
        yield put(setToast({ type: TOAST.error, text: ERROR.profile }));
    }
}
function* updateUserWorker({ payload }: PayloadAction<UpdateUserActionType>) {
    const { id, username, password, email, firstName, lastName, phone } = payload;

    try {
        const { data }: AxiosResponse<ResponseUser> = yield call(
            axiosInstance.put,
            `${USERS_URL.user}/${id}`,
            { username, password, email, firstName, lastName, phone },
        );

        yield put(updateUserSuccess(data));
        yield put(setToast({ type: TOAST.success, text: MESSAGES.editSuccess }));
    } catch {
        yield put(userRequestError());
        yield put(setToast({ type: TOAST.error, text: ERROR.editError }));
    }
}

function* blockUserRequestWorker({ payload }: PayloadAction<number | string>) {
    try {
        const { data }: AxiosResponse<ResponseUser> = yield call(
            axiosInstance.get,
            `${USERS_BLOCKING.blocking}/${payload}/block`,
        );

        yield put(blockUserRequestSuccess(data));
        yield put(setToast({ type: TOAST.success, text: MESSAGES.blockingSuccess }));
    } catch {
        yield put(blockUserRequestError());
        yield put(setToast({ type: TOAST.error, text: ERROR.blockingError }));
    }
}

function* unblockUserRequestWorker({ payload }: PayloadAction<number | string>) {
    try {
        const { data }: AxiosResponse<ResponseUser> = yield call(
            axiosInstance.get,
            `${USERS_BLOCKING.blocking}/${payload}/unblock`,
        );

        yield put(unblockUserRequestSuccess(data));
        yield put(setToast({ type: TOAST.success, text: MESSAGES.unblockingSuccess }));
    } catch {
        yield put(unblockUserRequestError());
        yield put(setToast({ type: TOAST.error, text: ERROR.unblockingError }));
    }
}

function* uploadAvatarWorker({ payload }: PayloadAction<UploadAvatarActionType>) {
    const { id, formData } = payload;

    try {
        const { data }: AxiosResponse<FileUploadResponseType[]> = yield call(
            axiosInstance.post,
            `${FILE_UPLOAD.upload}`,
            formData,
            {
                headers: {
                    'Content-type': 'multipart/form-data',
                },
            },
        );

        let user = {} as ResponseUser;

        const body = {
            avatar: data[0].id,
        };

        if (data) {
            const { data: userData }: AxiosResponse<ResponseUser> = yield call(
                axiosInstance.put,
                `${USERS_URL.user}/${id}`,
                body,
            );

            user = userData;
        }

        yield put(uploadAvatarSuccess(user));
        yield put(updateUserSuccess(user));
        yield put(setToast({ type: TOAST.success, text: MESSAGES.avatar }));
    } catch {
        yield put(userRequestError());
        yield put(setToast({ type: TOAST.error, text: ERROR.avatar }));
    }
}

export function* watchUserRequest() {
    yield takeLatest(userRequest, userRequestWorker);
    yield takeLatest(authenticatedUserRequest, getAuthenticatedUserWorker);
    yield takeLatest(updateUserRequest, updateUserWorker);
    yield takeLatest(uploadAvatarRequest, uploadAvatarWorker);
}

export function* watchUsersListRequest() {
    yield takeLatest(usersListRequest, usersListRequestWorker);
}

export function* watchuserForAdminRequest() {
    yield takeLatest(userForAdminRequest, userForAdminRequestWorker);
}

export function* watchBlockUserRequest() {
    yield takeLatest(blockUserRequest, blockUserRequestWorker);
}

export function* watchunBlockUserRequest() {
    yield takeLatest(unblockUserRequest, unblockUserRequestWorker);
}
