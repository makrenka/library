import { useEffect } from 'react';

import { BOOKING_DATA, TAKEN_DATA } from '../../../constants/profile-page';
import { bookListRequest } from '../../../store/books';
import { getBookList } from '../../../store/books/selectors';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { ResponseUser } from '../../../store/user/types';
import { ProfileBooking } from '../profile-booking';
import { ProfileHistory } from '../profile-history';

import styles from './profile-functions.module.scss';

type ProfileFunctionsProps = {
    user: ResponseUser;
};

export const ProfileFunctions = ({ user }: ProfileFunctionsProps) => {
    const books = useAppSelector(getBookList);
    const dispatch = useAppDispatch();

    const commentsUserBooksId = user?.comments?.map(({ bookId }) => bookId);

    useEffect(() => {
        if (!books?.length) {
            dispatch(bookListRequest());
        }
    }, [books, dispatch]);

    return (
        <div className={styles.wrapper}>
            <ProfileBooking
                dataTestId='booking'
                bookingBookId={user?.booking?.book?.id}
                bookingId={user?.booking?.id || 0}
                data={BOOKING_DATA}
                isExpired={
                    new Date().getTime() >= new Date(user.booking?.dateOrder || '').getTime() &&
                    new Date().getDate() !== new Date(user.booking?.dateOrder || '').getDate()
                }
                isBooking={true}
            />
            <ProfileBooking
                dataTestId='delivery'
                deliveryId={user.delivery?.book?.id}
                data={TAKEN_DATA}
                isExpired={new Date().getTime() >= new Date(user.delivery?.dateHandedTo).getTime()}
                deliveryDate={user.delivery?.dateHandedTo}
            />
            <ProfileHistory
                history={user.history?.books}
                userId={user.id}
                commentsUserBooksId={commentsUserBooksId}
            />
        </div>
    );
};
