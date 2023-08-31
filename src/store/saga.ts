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
    watchDeliveryDeleteRequest,
    watchDeliveryRequest,
    watchdeliveryUpdateRequest,
    watchhistoryRequest,
} from './books/sagas';
import { watchuserForAdminRequest, watchUserRequest, watchUsersListRequest } from './user/sagas';

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
        fork(watchdeliveryUpdateRequest),
        fork(watchDeliveryDeleteRequest),
        fork(watchBookReviewRequest),
        fork(watchBookReviewUpdate),
        fork(watchUsersListRequest),
        fork(watchuserForAdminRequest),
        fork(watchhistoryRequest),
    ]);
}
