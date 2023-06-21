import { useEffect, useState } from 'react';

import { Card } from '../../../components/card';
import { BookingDataType } from '../../../constants/profile-page';
import { getBookList } from '../../../store/books/selectors';
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
    const books = useAppSelector(getBookList);
    const [book, setBook] = useState({} as BookListItem | undefined);

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
            <span className={styles.title}>{data.title}</span>
            <span className={styles.subtitle}>{data.subtitle}</span>
            {!!bookingBookId || !!deliveryId ? (
                <Card
                    data={book ? book : ({} as BookListItem)}
                    isProfileCard={!!deliveryId}
                    deliveryDate={deliveryDate}
                    isBooking={isBooking}
                    bookingId={bookingId}
                />
            ) : (
                <ProfileEmpty data={data.data} />
            )}
        </div>
    );
};
