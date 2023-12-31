import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { Card } from '../../../components/card';
import { BookingDataType } from '../../../constants/profile-page';
import { getBookListProfile } from '../../../store/books/selectors';
import { BookListItem } from '../../../store/books/types';
import { useAppSelector } from '../../../store/hooks';
import { ExpiredMask } from '../expired-mask';
import { ProfileEmpty } from '../profile-empty';

import styles from './profile-booking.module.scss';

type ProfileBookingProps = {
    bookingBookId?: number;
    bookingId?: number;
    deliveryId?: number;
    data: BookingDataType;
    isExpired?: boolean;
    isBooking?: boolean;
    deliveryDate?: string | Date;
    dataTestId?: string;
};

export const ProfileBooking = ({
    bookingBookId,
    bookingId,
    deliveryId,
    deliveryDate,
    data,
    isExpired,
    isBooking,
    dataTestId,
}: ProfileBookingProps) => {
    const books = useAppSelector(getBookListProfile);
    const [book, setBook] = useState({} as BookListItem | undefined);
    const { pathname } = useLocation();

    // TODO Когда у "коротких" книг появятся картинки - переделать напрямую передачу
    useEffect(() => {
        if (books && !!bookingBookId) {
            setBook(books.find(({ id }) => id === bookingBookId));
        }
        if (books && !!deliveryId) {
            setBook(books.find(({ id }) => id === deliveryId));
        }
    }, [book, bookingBookId, deliveryId, books]);

    return (
        <div className={styles.functionsItem} data-test-id={dataTestId}>
            {isExpired && (bookingBookId || deliveryId) && (
                <ExpiredMask
                    expiredTitle={data.expiredTitle}
                    expiredSubtitle={data.expiredSubtitle}
                />
            )}
            <span className={classNames(
                styles.title,
                pathname.includes('admin') && styles.titleAdmin,
            )}>
                {pathname.includes('profile') ? data.title : data.titleAdmin}
            </span>

            {pathname.includes('profile') ? (
                <span className={styles.subtitle}>{data.subtitle}</span>
            ) : null}
            {!!bookingBookId || !!deliveryId ? (
                <Card
                    data={book ? book : ({} as BookListItem)}
                    isProfileCard={!!deliveryId}
                    deliveryDate={deliveryDate}
                    isBooking={isBooking}
                    bookingId={bookingId}
                />
            ) : (
                <ProfileEmpty
                    data={pathname.includes('profile') ? data.data : (data.dataAdmin as string)}
                />
            )}
        </div>
    );
};
