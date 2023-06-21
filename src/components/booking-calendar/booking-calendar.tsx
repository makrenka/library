import { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames';
import startOfDay from 'date-fns/startOfDay';

import { BOOKING } from '../../constants/books';
import { useCalendar } from '../../hooks/use-calendar';
import {
    bookingDeleteRequest,
    bookingRequest,
    bookingUpdateRequest,
    toggleBookingModal,
} from '../../store/books';
import { booksSelector } from '../../store/books/selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { checkDateIsEqual, checkIsBlockedDate } from '../../utils/date';
import { Button } from '../button';
import { Modal } from '../modal';
import arrow from '../navigation/assets/arrow-bottom-black.svg';

import styles from './booking-calendar.module.scss';

export const BookingCalendar = () => {
    const dispatch = useAppDispatch();
    const {
        booking: { bookId, isLoading, isEdit, id: bookingId, bookingDate, isOpenBookingModal },
    } = useAppSelector(booksSelector);
    const today = new Date();
    const {
        state,
        functions: { setSelectedMonthByIndex, onClickArrow },
    } = useCalendar({ locale: 'default', selectedDate: today });

    const [dateOrder, setDateOrder] = useState<string | Date>('');

    const dayClassName = (dayNumberInWeek: number, date: Date) =>
        classNames(styles.dayButton, {
            [styles.dayButtonToday]: checkDateIsEqual(date, today),
            [styles.dayButtonActive]: dateOrder === date.toISOString(),
            [styles.endWeek]: dayNumberInWeek === 1 || dayNumberInWeek === 7,
        });

    const closeHandler = () => {
        setDateOrder('');
        dispatch(toggleBookingModal({ showModal: false, bookId: null }));
    };

    useEffect(() => {
        if (isEdit && bookingDate) {
            setDateOrder(bookingDate);
        } else {
            setDateOrder('');
        }
    }, [bookingDate, isEdit, state.calendarDays, state.selectedYear, isOpenBookingModal]);

    if (!isOpenBookingModal) {
        return null;
    }

    return (
        <Modal
            onClose={closeHandler}
            title={isEdit ? BOOKING.titleUpdate : BOOKING.titleCreate}
            dataTestId='booking-modal'
        >
            <div className={styles.calendarWrapper} data-test-id='calendar'>
                <div className={styles.calendarHeader}>
                    <select
                        onChange={(e) => setSelectedMonthByIndex(Number(e.target.value))}
                        value={state.selectedMonth.monthIndex}
                        className={styles.select}
                        data-test-id='month-select'
                    >
                        {state.monthesNames.map((item) => (
                            <option
                                label={`${item.month} ${
                                    state.selectedMonth.monthIndex === item.monthIndex
                                        ? state.selectedYear
                                        : ''
                                }`}
                                value={item.monthIndex}
                                key={item.month}
                            >
                                {item.month}
                            </option>
                        ))}
                    </select>
                    <Button
                        classButton={styles.arrow}
                        onClick={() => onClickArrow('left')}
                        dataTestId='button-prev-month'
                    >
                        <img src={arrow} alt='' />
                    </Button>
                    <Button
                        classButton={styles.arrow}
                        onClick={() => onClickArrow('right')}
                        dataTestId='button-next-month'
                    >
                        <img src={arrow} alt='' />
                    </Button>
                </div>

                <div className={styles.calendarContent}>
                    <div className={styles.calendarDayNames}>
                        {state.weekDaysNames.map(({ dayShort }) => (
                            <span key={dayShort}>{dayShort}</span>
                        ))}
                    </div>
                    <div className={styles.calendarDaysWrapper}>
                        {state.calendarDays.map(({ dayNumber, date, dayNumberInWeek }, index) => (
                            <Button
                                key={`${date}`}
                                classButton={dayClassName(dayNumberInWeek, date)}
                                isDisabled={checkIsBlockedDate(state.calendarDays[index])}
                                onClick={() => setDateOrder(date.toISOString())}
                                dataTestId='day-button'
                            >
                                {dayNumber}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            {isEdit ? (
                <Fragment>
                    <Button
                        classButton={styles.buttonReserv}
                        onClick={() =>
                            dispatch(bookingUpdateRequest({ dateOrder, bookId, bookingId }))
                        }
                        dataTestId='booking-button'
                        view='primary'
                        isDisabled={isLoading || dateOrder === bookingDate}
                    >
                        {BOOKING.buttonUpdate}
                    </Button>
                    <Button
                        classButton={styles.buttonReserv}
                        view='secondary'
                        onClick={() => dispatch(bookingDeleteRequest(bookingId))}
                        isDisabled={isLoading}
                        dataTestId='booking-cancel-button'
                    >
                        {BOOKING.buttonCancel}
                    </Button>
                </Fragment>
            ) : (
                <Button
                    classButton={styles.buttonReserv}
                    onClick={() => dispatch(bookingRequest({ dateOrder, bookId }))}
                    // isLoading={isLoading}
                    view='primary'
                    isDisabled={!dateOrder || isLoading}
                    dataTestId='booking-button'
                >
                    {BOOKING.buttonCreate}
                </Button>
            )}
        </Modal>
    );
};
