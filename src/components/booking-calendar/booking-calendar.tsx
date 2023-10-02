import { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames';

import { BOOKING, DELIVERY } from '../../constants/books';
import { useCalendar } from '../../hooks/use-calendar';
import {
    bookingDeleteRequest,
    bookingRequest,
    bookingUpdateRequest,
    deliveryRequest,
    deliveryUpdateRequest,
    historyAddRequest,
    historyRequest,
    toggleBookingModal,
    toggleDeliveryModal,
} from '../../store/books';
import { booksSelector } from '../../store/books/selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { checkDateIsEqual, checkIsBlockedDate, createDate } from '../../utils/date';
import { Button } from '../button';
import { Modal } from '../modal';
import arrow from '../navigation/assets/arrow-bottom-black.svg';
import { getUserSelector } from '../../store/user/selectors';
import { resetUserForAdmin, userForAdminRequest } from '../../store/user';

import styles from './booking-calendar.module.scss';

export const BookingCalendar = () => {
    const dispatch = useAppDispatch();
    const {
        booking: {
            bookId,
            isLoading,
            isBookingEdit,
            id: bookingId,
            bookingDate,
            isOpenBookingModal,
        },
        delivery: {
            dateHandedFrom,
            dateHandedTo,
            isDeliveryEdit,
            isDelivery,
            bookIdDelivery,
            id: deliveryId,
            userId,
        },
    } = useAppSelector(booksSelector);

    const { userForAdmin: user } = useAppSelector(getUserSelector);
    const historyId = user.history?.id;

    const today = new Date();

    const {
        state,
        functions: { setSelectedMonthByIndex, onClickArrow },
    } = useCalendar({ locale: 'default', selectedDate: today });

    const [dateOrder, setDateOrder] = useState<string | Date>('');
    const [deliveryDateFrom, setDeliveryDateFrom] = useState<string | Date>('');
    const [deliveryDateTo, setDeliveryDateTo] = useState<string | Date>('');

    const dayClassName = (dayNumberInWeek: number, date: Date) =>
        classNames(styles.dayButton, {
            [styles.dayButtonToday]: checkDateIsEqual(date, today),
            [styles.dayButtonActive]:
                dateOrder === date.toISOString() || deliveryDateTo === date.toISOString(),
            [styles.endWeek]: dayNumberInWeek === 1 || dayNumberInWeek === 7,
        });

    const closeHandler = () => {
        setDateOrder('');
        dispatch(toggleBookingModal({ showModal: false, bookId: null }));
        dispatch(
            toggleDeliveryModal({ showModal: false, bookIdDelivery: null, isDelivery: false }),
        );
    };

    useEffect(() => {
        if (isBookingEdit && bookingDate) {
            setDateOrder(bookingDate);
        } else {
            setDateOrder('');
        }
    }, [bookingDate, isBookingEdit, state.calendarDays, state.selectedYear, isOpenBookingModal]);

    useEffect(() => {
        if (isDeliveryEdit && dateHandedFrom && dateHandedTo) {
            setDeliveryDateFrom(dateHandedFrom);
            setDeliveryDateTo(dateHandedTo);
        } else {
            setDeliveryDateFrom('');
            setDeliveryDateTo('');
        }
    }, [
        isDeliveryEdit,
        dateHandedFrom,
        dateHandedTo,
        state.calendarDays,
        state.selectedYear,
        isOpenBookingModal,
    ]);

    useEffect(() => {
        if (userId) {
            dispatch(userForAdminRequest(String(userId)));
        }

        return () => {
            dispatch(resetUserForAdmin());
        };
    }, [userId, dispatch]);

    const deliveryDates = (date: Date) => {
        setDeliveryDateFrom(today.toISOString());
        setDeliveryDateTo(date.toISOString());
    };

    const createDelivery = () => {
        dispatch(deliveryRequest({ deliveryDateFrom, deliveryDateTo, bookIdDelivery }));
        if (user.history?.id) {
            dispatch(historyAddRequest({ historyId, bookIdDelivery }));
        } else {
            dispatch(historyRequest({ bookIdDelivery }));
        }
    };

    const renderBoocking = (
        <Modal
            onClose={closeHandler}
            title={isBookingEdit ? BOOKING.titleUpdate : BOOKING.titleCreate}
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
                                isDisabled={checkIsBlockedDate(state.calendarDays[index], 1)}
                                onClick={() => setDateOrder(date.toISOString())}
                                dataTestId='day-button'
                            >
                                {dayNumber}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            {isBookingEdit ? (
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

    const renderDelivery = (
        <Modal
            onClose={closeHandler}
            title={isDeliveryEdit ? DELIVERY.titleUpdate : DELIVERY.titleCreate}
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
                                isDisabled={checkIsBlockedDate(state.calendarDays[index], 14)}
                                onClick={() => deliveryDates(date)}
                                dataTestId='day-button'
                            >
                                {dayNumber}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            {isDeliveryEdit ? (
                <Fragment>
                    <Button
                        classButton={styles.buttonReserv}
                        onClick={() =>
                            dispatch(
                                deliveryUpdateRequest({
                                    deliveryDateFrom,
                                    deliveryDateTo,
                                    bookIdDelivery,
                                    deliveryId,
                                }),
                            )
                        }
                        view='primary'
                        isDisabled={!deliveryDateTo || isLoading}
                    >
                        {DELIVERY.buttonUpdate}
                    </Button>
                    <Button
                        classButton={styles.buttonReserv}
                        view='secondary'
                        onClick={closeHandler}
                        isDisabled={isLoading}
                    >
                        {DELIVERY.buttonCancel}
                    </Button>
                </Fragment>
            ) : (
                <Button
                    classButton={styles.buttonReserv}
                    onClick={createDelivery}
                    view='primary'
                    isDisabled={!deliveryDateTo || isLoading}
                >
                    {DELIVERY.buttonCreate}
                </Button>
            )}
        </Modal>
    );

    if (!isOpenBookingModal) {
        return null;
    }

    if (isDelivery) {
        return renderDelivery;
    }
    return renderBoocking;
};
