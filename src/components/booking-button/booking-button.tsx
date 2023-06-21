import { SyntheticEvent, useMemo } from 'react';
import classNames from 'classnames';

import { BUTTON_TEXT } from '../../constants/button';
import { authSelector } from '../../store/auth/selectors';
import { toggleBookingModal } from '../../store/books';
import { BookDataType, BookListItem } from '../../store/books/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { formatDate } from '../../utils/date/date-utils';
import { Button } from '../button';

import styles from '../../pages/book/book-page.module.scss';

export const BookingButton = ({
    bookData,
    isOnBookInfoPage,
}: {
    bookData: BookDataType | BookListItem;
    isOnBookInfoPage?: boolean;
}) => {
    const {
        auth: { userData },
    } = useAppSelector(authSelector);
    const userIdReserved = bookData?.booking?.customerId;
    const dispatch = useAppDispatch();

    const renderButtonReservText = useMemo(() => {
        switch (true) {
            case bookData?.booking?.order:
                return BUTTON_TEXT.RESERVED;
            case bookData?.delivery?.handed:
                return `Занята до ${formatDate(bookData?.delivery?.dateHandedTo || '')}`;
            default:
                return BUTTON_TEXT.RESERVE;
        }
    }, [bookData]);

    const isDisabledBooking =
        (bookData?.booking?.order && userIdReserved !== userData?.id) || bookData?.delivery?.handed;

    const classButtonReserve = classNames(
        styles.button,
        renderButtonReservText === BUTTON_TEXT.RESERVE
            ? styles.buttonReserve
            : styles.buttonReserved,
    );

    const handleOpenBookingModal = (e: SyntheticEvent, isEdit: boolean) => {
        e.preventDefault();
        dispatch(
            toggleBookingModal({
                showModal: true,
                bookId: bookData?.id || '',
                isEdit,
                bookingId: bookData?.booking?.id || null,
                bookingDate: bookData?.booking?.dateOrder,
                isOnBookInfoPage,
            }),
        );
    };

    return (
        <Button
            classButton={classButtonReserve}
            onClick={(e) => handleOpenBookingModal(e, userIdReserved === userData?.id)}
            isDisabled={isDisabledBooking}
            dataTestId='booking-button'
        >
            <span>{renderButtonReservText}</span>
        </Button>
    );
};
