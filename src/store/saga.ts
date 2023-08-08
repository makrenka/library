import { all, fork } from 'redux-saga/effects';

import {
    watchAuthRequest,
    watchForgotPasswordRequest,
    watchRegistrationRequest,
    watchResetPasswordRequest,
} from './auth/sagas';
import {
    watchBookCategoriesRequest,
    watchBookingDeleteRequest,
    watchBookingRequest,
    watchBookingUpdateRequest,
    watchBookListRequest,
    watchbookListRequestBooked,
    watchbookListRequestDeliveried,
    watchBookListRequestScroll,
    watchbookListRequestSortingAlphabetAsc,
    watchbookListRequestSortingAlphabetDesc,
    watchBookRequest,
    watchBookReviewRequest,
    watchBookReviewUpdate,
    watchDeliveryRequest,
} from './books/sagas';
import { watchUserRequest, watchUsersListRequest } from './user/sagas';

export function* rootSaga() {
    yield all([
        fork(watchBookListRequest),
        fork(watchBookListRequestScroll),
        fork(watchbookListRequestSortingAlphabetAsc),
        fork(watchbookListRequestSortingAlphabetDesc),
        fork(watchbookListRequestBooked),
        fork(watchbookListRequestDeliveried),
        fork(watchBookRequest),
        fork(watchUserRequest),
        fork(watchBookCategoriesRequest),
        fork(watchAuthRequest),
        fork(watchRegistrationRequest),
        fork(watchForgotPasswordRequest),
        fork(watchResetPasswordRequest),
        fork(watchBookingRequest),
        fork(watchBookingUpdateRequest),
        fork(watchBookingDeleteRequest),
        fork(watchDeliveryRequest),
        fork(watchBookReviewRequest),
        fork(watchBookReviewUpdate),
        fork(watchUsersListRequest),
    ]);
}
