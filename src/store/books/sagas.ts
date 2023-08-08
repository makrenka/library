import { call, put, select, takeLatest } from 'redux-saga/effects';
import { AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { axiosInstance } from '../../api/axios';
import {
    DefaultValuesType,
    UpdateCommentPayloadType,
} from '../../components/modal-rate-book/modal-rate-book';
import { BOOKS_URL } from '../../constants/api';
import { ERROR } from '../../constants/errors';
import { TOAST } from '../../constants/toast';
import { MESSAGES } from '../../constants/toast-messages';
import { authenticationSelector } from '../auth/selectors';
import { addBookingUpdateUser, addDeliveryUpdateUser, deleteBookingUpdateUser } from '../user';
import { Comment, UserBooking, UserDelivery } from '../user/types';
import { setToast } from '../view';

import { booksSelector } from './selectors';
import { BookCategoriesDataType, BookDataType, BookListItem } from './types';
import {
    bookCategoriesFailure,
    bookCategoriesRequest,
    bookCategoriesSuccess,
    bookingDeleteRequest,
    bookingRequest,
    bookingRequestFailure,
    bookingRequestSuccess,
    bookingUpdateRequest,
    bookListRequest,
    bookListRequestFailure,
    bookListRequestNull,
    bookListRequestScroll,
    bookListRequestScrollSuccess,
    bookListRequestSortingAlphabetAsc,
    bookListRequestSortingAlphabetAscSuccess,
    bookListRequestSortingAlphabetDesc,
    bookListRequestSuccess,
    bookListRequestBooked,
    bookListRequestBookedSuccess,
    bookRequest,
    bookRequestFailure,
    bookRequestSuccess,
    bookReviewRequest,
    bookReviewRequestFailure,
    bookReviewRequestSuccess,
    bookReviewUpdateFailure,
    bookReviewUpdateRequest,
    bookReviewUpdateSuccess,
    deliveryRequestSuccess,
    deliveryRequestFailure,
    deliveryRequest,
    bookListRequestDeliveried,
} from '.';
import { searchSelector } from '../search/selectors';

function* bookListRequestWorker() {
    try {
        const response: AxiosResponse<BookListItem[]> = yield call(
            axiosInstance.get,
            BOOKS_URL.list,
        );

        yield put(bookListRequestSuccess(response.data));
    } catch {
        yield put(bookListRequestFailure());
        yield put(setToast({ type: TOAST.error, text: ERROR.book }));
    }
}

function* bookListRequestScrollWorker({ payload }: PayloadAction<number>) {
    try {
        const response: AxiosResponse<BookListItem[]> = yield call(
            axiosInstance.get,
            `${BOOKS_URL.list}?pagination[page]=${payload}&pagination[pageSize]=12`,
        );

        yield put(bookListRequestScrollSuccess(response.data));
    } catch {
        yield put(bookListRequestFailure());
        yield put(setToast({ type: TOAST.error, text: ERROR.book }));
    }
}

function* bookListRequestSortingAlphabetAscWorker({ payload }: PayloadAction<number>) {
    try {
        const response: AxiosResponse<BookListItem[]> = yield call(
            axiosInstance.get,
            `${BOOKS_URL.list}?sort=title:asc&pagination[page]=${payload}&pagination[pageSize]=12`,
        );

        yield put(bookListRequestSortingAlphabetAscSuccess(response.data));
    } catch {
        yield put(bookListRequestFailure());
        yield put(setToast({ type: TOAST.error, text: ERROR.book }));
    }
}

function* bookListRequestSortingAlphabetDescWorker({ payload }: PayloadAction<number>) {
    try {
        const response: AxiosResponse<BookListItem[]> = yield call(
            axiosInstance.get,
            `${BOOKS_URL.list}?sort=title:desc&pagination[page]=${payload}&pagination[pageSize]=12`,
        );

        yield put(bookListRequestSortingAlphabetAscSuccess(response.data));
    } catch {
        yield put(bookListRequestFailure());
        yield put(setToast({ type: TOAST.error, text: ERROR.book }));
    }
}

function* bookListRequestBookedWorker() {
    try {
        const response: AxiosResponse<BookListItem[]> = yield call(
            axiosInstance.get,
            `${BOOKS_URL.list}?filters[booking][order]=true`,
        );

        yield put(bookListRequestBookedSuccess(response.data));
    } catch {
        yield put(bookListRequestFailure());
        yield put(setToast({ type: TOAST.error, text: ERROR.book }));
    }
}

function* bookListRequestDeliveriedWorker() {
    try {
        const response: AxiosResponse<BookListItem[]> = yield call(
            axiosInstance.get,
            `${BOOKS_URL.list}?filters[delivery][handed]=true`,
        );

        yield put(bookListRequestBookedSuccess(response.data));
    } catch {
        yield put(bookListRequestFailure());
        yield put(setToast({ type: TOAST.error, text: ERROR.book }));
    }
}

function* bookCategoriesRequestWorker() {
    try {
        const response: AxiosResponse<BookCategoriesDataType> = yield call(
            axiosInstance.get,
            BOOKS_URL.categories,
        );

        yield put(bookCategoriesSuccess(response.data));
    } catch {
        yield put(bookCategoriesFailure());
        yield put(setToast({ type: TOAST.error, text: ERROR.book }));
    }
}

function* bookRequestWorker({ payload }: PayloadAction<string>) {
    let comments: Comment[];

    try {
        const { data }: AxiosResponse<BookDataType> = yield call(
            axiosInstance.get,
            `${BOOKS_URL.item}/${payload}`,
        );

        comments = data.comments;

        comments?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        const sorted = { ...data, comments };

        yield put(bookRequestSuccess(sorted));
    } catch {
        yield put(bookRequestFailure());
        yield put(setToast({ type: TOAST.error, text: ERROR.book }));
    }
}

function* bookingRequestWorker({ payload }: PayloadAction<{ dateOrder: string; bookId: number }>) {
    const {
        booking,
        book,
        bookList: { data: bookListData },
    } = yield select(booksSelector);

    try {
        const { userData } = yield select(authenticationSelector);
        const { data }: AxiosResponse = yield call(axiosInstance.post, BOOKS_URL.booking, {
            data: {
                order: true,
                dateOrder: payload.dateOrder,
                book: payload.bookId,
                customer: userData.id,
            },
        });

        yield put(
            bookingRequestSuccess({
                data,
                message: MESSAGES.bookingSuccess,
            }),
        );
        const { id } = data;
        const { order, dateOrder } = data.attributes;
        const bookUpdateData = bookListData.find(
            ({ id: itemId }: BookListItem) => itemId === payload.bookId,
        );
        const userBookingUpdate: UserBooking = {
            id,
            order,
            dateOrder,
            book: bookUpdateData,
        };
        const { isSortingByRating, isSortedDesc } = yield select(searchSelector);

        yield put(setToast({ type: TOAST.success, text: MESSAGES.bookingSuccess }));
        yield put(addBookingUpdateUser(userBookingUpdate));

        if (booking?.isOnBookInfoPage) {
            yield put(bookRequest(book.data.id));
        } else if (isSortingByRating) {
            yield put(bookListRequestNull());
            yield put(bookListRequestScroll(1));
        } else if (!isSortingByRating && isSortedDesc) {
            yield put(bookListRequestNull());
            yield put(bookListRequestSortingAlphabetAsc(1));
        } else if (!isSortingByRating && !isSortedDesc) {
            yield put(bookListRequestNull());
            yield put(bookListRequestSortingAlphabetDesc(1));
        }
    } catch {
        yield put(bookingRequestFailure(ERROR.bookingError));
        yield put(setToast({ type: TOAST.error, text: ERROR.bookingError }));
    }
}

function* deliveryRequestWorker({ payload }: PayloadAction<{
    deliveryDateFrom: string;
    deliveryDateTo: string;
    bookIdDelivery: number
}>) {
    const {
        delivery,
        book,
        bookList: { data: bookListData },
    } = yield select(booksSelector);

    try {
        const { userData } = yield select(authenticationSelector);
        const { data }: AxiosResponse = yield call(axiosInstance.post, BOOKS_URL.delivery, {
            data: {
                handed: true,
                dateHandedFrom: payload.deliveryDateFrom,
                dateHandedTo: payload.deliveryDateTo,
                book: payload.bookIdDelivery,
                recipient: userData.id,
            },
        });

        yield put(
            deliveryRequestSuccess({
                data,
                message: MESSAGES.deliverySuccess,
            }),
        );

        const { id } = data;
        const { handed, dateHandedFrom, dateHandedTo } = data.attributes;
        const bookUpdateData = bookListData.find(
            ({ id: itemId }: BookListItem) => itemId === payload.bookIdDelivery,
        );
        const userDeliveryUpdate: UserDelivery = {
            id,
            handed,
            dateHandedFrom,
            dateHandedTo,
            book: bookUpdateData,
        };

        yield put(setToast({ type: TOAST.success, text: MESSAGES.deliverySuccess }));
        yield put(addDeliveryUpdateUser(userDeliveryUpdate));

        if(delivery?.isOnBookInfoPage) {
            yield put(bookRequest(book.data.id));
        } else {
            yield put(bookListRequestNull());
            yield put(bookListRequestBooked());
            yield put(bookListRequestDeliveried());
        }

    } catch {
        yield put(deliveryRequestFailure(ERROR.deliveryError));
        yield put(setToast({ type: TOAST.error, text: ERROR.deliveryError }));
    }
}

function* bookingUpdateRequestWorker({
    payload,
}: PayloadAction<{ dateOrder: string; bookId: number; bookingId: string | number }>) {
    const { booking, book } = yield select(booksSelector);

    try {
        const { userData } = yield select(authenticationSelector);

        const response: AxiosResponse = yield call(
            axiosInstance.put,
            `${BOOKS_URL.booking}/${payload.bookingId}`,
            {
                data: {
                    order: true,
                    dateOrder: payload.dateOrder,
                    book: payload.bookId,
                    customer: userData.id,
                },
            },
        );
        const { isSortingByRating, isSortedDesc } = yield select(searchSelector);

        yield put(
            bookingRequestSuccess({
                data: response.data,
                message: MESSAGES.editSuccess,
            }),
        );
        yield put(setToast({ type: TOAST.success, text: MESSAGES.editSuccess }));

        if (booking?.isOnBookInfoPage) {
            yield put(bookRequest(book.data.id));
        } else if (isSortingByRating) {
            yield put(bookListRequestNull());
            yield put(bookListRequestScroll(1));
        } else if (!isSortingByRating && isSortedDesc) {
            yield put(bookListRequestNull());
            yield put(bookListRequestSortingAlphabetAsc(1));
        } else if (!isSortingByRating && !isSortedDesc) {
            yield put(bookListRequestNull());
            yield put(bookListRequestSortingAlphabetDesc(1));
        }
    } catch {
        yield put(bookingRequestFailure(ERROR.editError));
        yield put(setToast({ type: TOAST.error, text: ERROR.editError }));
    }
}

function* bookingDeleteRequestWorker({ payload }: PayloadAction<string>) {
    const { booking, book } = yield select(booksSelector);

    try {
        const response: AxiosResponse = yield call(
            axiosInstance.delete,
            `${BOOKS_URL.booking}/${payload}`,
        );
        const { isSortingByRating, isSortedDesc } = yield select(searchSelector);

        yield put(
            bookingRequestSuccess({
                data: response.data,
                message: MESSAGES.bookingDelete,
            }),
        );
        yield put(setToast({ type: TOAST.success, text: MESSAGES.bookingDelete }));
        yield put(deleteBookingUpdateUser());

        if (booking?.isOnBookInfoPage) {
            yield put(bookRequest(book.data.id));
        } else if (isSortingByRating) {
            yield put(bookListRequestNull());
            yield put(bookListRequestScroll(1));
        } else if (!isSortingByRating && isSortedDesc) {
            yield put(bookListRequestNull());
            yield put(bookListRequestSortingAlphabetAsc(1));
        } else if (!isSortingByRating && !isSortedDesc) {
            yield put(bookListRequestNull());
            yield put(bookListRequestSortingAlphabetDesc(1));
        }
    } catch {
        yield put(bookingRequestFailure(ERROR.bookingDelete));
        yield put(setToast({ type: TOAST.error, text: ERROR.bookingDelete }));
    }
}

function* bookReviewRequestWorker({ payload }: PayloadAction<DefaultValuesType>) {
    try {
        const response: AxiosResponse = yield call(axiosInstance.post, BOOKS_URL.comment, {
            data: payload,
        });

        yield put(
            bookReviewRequestSuccess({
                data: response.data,
                message: MESSAGES.raiting,
            }),
        );
        yield put(setToast({ type: TOAST.success, text: MESSAGES.raiting }));

        yield put(bookRequest(payload.book));
    } catch {
        yield put(bookReviewRequestFailure(ERROR.raiting));
        yield put(setToast({ type: TOAST.error, text: ERROR.raiting }));
    }
}

function* bookReviewUpdateWorker({ payload }: PayloadAction<UpdateCommentPayloadType>) {
    const { rating, text, book, user } = payload;
    const data = {
        rating,
        text,
        book,
        user,
    };

    try {
        const response: AxiosResponse = yield call(
            axiosInstance.put,
            `${BOOKS_URL.comment}/${payload.commentId}`,
            { data },
        );

        yield put(
            bookReviewUpdateSuccess({
                data: response.data,
                message: MESSAGES.updateReviewSuccess,
            }),
        );
        yield put(setToast({ type: TOAST.success, text: MESSAGES.updateReviewSuccess }));
    } catch {
        yield put(bookReviewUpdateFailure(ERROR.updateReviewError));
        yield put(setToast({ type: TOAST.error, text: ERROR.updateReviewError }));
    }
}

export function* watchBookListRequest() {
    yield takeLatest(bookListRequest, bookListRequestWorker);
}

export function* watchBookListRequestScroll() {
    yield takeLatest(bookListRequestScroll, bookListRequestScrollWorker)
}

export function* watchbookListRequestSortingAlphabetAsc() {
    yield takeLatest(bookListRequestSortingAlphabetAsc, bookListRequestSortingAlphabetAscWorker)
}

export function* watchbookListRequestSortingAlphabetDesc() {
    yield takeLatest(bookListRequestSortingAlphabetDesc, bookListRequestSortingAlphabetDescWorker)
}

export function* watchbookListRequestBooked() {
    yield takeLatest(bookListRequestBooked, bookListRequestBookedWorker);
}

export function* watchbookListRequestDeliveried() {
    yield takeLatest(bookListRequestDeliveried, bookListRequestDeliveriedWorker);
}

export function* watchBookRequest() {
    yield takeLatest(bookRequest, bookRequestWorker);
}

export function* watchBookCategoriesRequest() {
    yield takeLatest(bookCategoriesRequest, bookCategoriesRequestWorker);
}

export function* watchBookingRequest() {
    yield takeLatest(bookingRequest, bookingRequestWorker);
}

export function* watchBookingUpdateRequest() {
    yield takeLatest(bookingUpdateRequest, bookingUpdateRequestWorker);
}

export function* watchBookingDeleteRequest() {
    yield takeLatest(bookingDeleteRequest, bookingDeleteRequestWorker);
}

export function* watchDeliveryRequest() {
    yield takeLatest(deliveryRequest, deliveryRequestWorker);
}

export function* watchBookReviewRequest() {
    yield takeLatest(bookReviewRequest, bookReviewRequestWorker);
}

export function* watchBookReviewUpdate() {
    yield takeLatest(bookReviewUpdateRequest, bookReviewUpdateWorker);
}
