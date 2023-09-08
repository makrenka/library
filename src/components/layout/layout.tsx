import { useEffect, useState, createContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';

import {
    bookingSelector,
    booksSelector,
    getIsLoadingBooksRequests,
    getLoadingBooksList,
} from '../../store/books/selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { authenticatedUserRequest } from '../../store/user';
import { getUserSelector } from '../../store/user/selectors';
import { getToasts } from '../../store/view/selectors';
import { BookingCalendar } from '../booking-calendar';
import { Footer } from '../footer';
import { Header } from '../header';
import { Loader } from '../loader/loader';
import { ModalRateBook } from '../modal-rate-book';
import { Toast } from '../toast';

import styles from './layout.module.scss';

type BookedChecked = {
    isBookedChecked: boolean;
    setIsBookedChecked: (is: boolean) => void;
};

type DeliveriedChecked = {
    isDeliveriedChecked: boolean;
    setIsDeliveriedChecked: (is: boolean) => void;
};

type AllUsersChecked = {
    isAllUsersChecked: boolean;
    setIsAllUsersChecked: (is: boolean) => void;
};

type BookHoldersChecked = {
    isBookHoldersChecked: boolean;
    setIsBookHoldersChecked: (is: boolean) => void;
};

type BlockedUsersChecked = {
    isBlockedUsersChecked: boolean;
    setIsBlockedUsersChecked: (is: boolean) => void;
};

export const BookedCheckedContext = createContext<BookedChecked>({
    isBookedChecked: true,
    setIsBookedChecked: () => { },
});

export const DeliveriedCheckedContext = createContext<DeliveriedChecked>({
    isDeliveriedChecked: true,
    setIsDeliveriedChecked: () => { },
});

export const AllUsersCheckedContext = createContext<AllUsersChecked>({
    isAllUsersChecked: true,
    setIsAllUsersChecked: () => { },
});

export const BookHoldersCheckedContext = createContext<BookHoldersChecked>({
    isBookHoldersChecked: true,
    setIsBookHoldersChecked: () => { },
});

export const BlockedUsersCheckedContext = createContext<BlockedUsersChecked>({
    isBlockedUsersChecked: true,
    setIsBlockedUsersChecked: () => { },
});

export const Layout = () => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const { data: user } = useAppSelector(getUserSelector);
    const {
        bookReview: { isOpenReviewModal },
    } = useAppSelector(booksSelector);

    const [isBookedChecked, setIsBookedChecked] = useState(true);
    const [isDeliveriedChecked, setIsDeliveriedChecked] = useState(true);
    const [isAllUsersChecked, setIsAllUsersChecked] = useState(true);
    const [isBookHoldersChecked, setIsBookHoldersChecked] = useState(false);
    const [isBlockedUsersChecked, setIsBlockedUsersChecked] = useState(false);

    useEffect(() => {
        dispatch(authenticatedUserRequest());
    }, [dispatch]);

    const isLoadingBooksRequests = useSelector(getIsLoadingBooksRequests);
    const isLoadingBooksList = useSelector(getLoadingBooksList);
    const { isLoading: isLoadingBooking } = useSelector(bookingSelector);
    const toasts = useSelector(getToasts);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const bookedCheckedProviderValue = useMemo(
        () => ({ isBookedChecked, setIsBookedChecked }),
        [isBookedChecked, setIsBookedChecked],
    );

    const deliveriedCheckedProviderValue = useMemo(
        () => ({ isDeliveriedChecked, setIsDeliveriedChecked }),
        [isDeliveriedChecked, setIsDeliveriedChecked],
    );

    const allUsersCheckedProviderValue = useMemo(
        () => ({ isAllUsersChecked, setIsAllUsersChecked }),
        [isAllUsersChecked, setIsAllUsersChecked],
    );

    const bookHoldersCheckedProviderValue = useMemo(
        () => ({ isBookHoldersChecked, setIsBookHoldersChecked }),
        [isBookHoldersChecked, setIsBookHoldersChecked],
    );

    const blockedUsersCheckedProviderValue = useMemo(
        () => ({ isBlockedUsersChecked, setIsBlockedUsersChecked }),
        [isBlockedUsersChecked, setIsBlockedUsersChecked],
    );

    return (
        <BookedCheckedContext.Provider value={bookedCheckedProviderValue}>
            <DeliveriedCheckedContext.Provider value={deliveriedCheckedProviderValue}>
                <AllUsersCheckedContext.Provider value={allUsersCheckedProviderValue}>
                    <BookHoldersCheckedContext.Provider value={bookHoldersCheckedProviderValue}>
                        <BlockedUsersCheckedContext.Provider
                            value={blockedUsersCheckedProviderValue}
                        >
                            <div className={styles.layout} data-test-id='app'>
                                <Header
                                    avatar={user?.avatar}
                                    path={pathname.slice(1)}
                                    userFirstName={user?.firstName}
                                />
                                <Outlet />
                                <Footer />
                                {(isLoadingBooksRequests ||
                                    isLoadingBooksList ||
                                    isLoadingBooking) && <Loader />}
                                {toasts.length > 0 && (
                                    <div className={styles.toastsWrapper}>
                                        {toasts.map(({ text, type }) => (
                                            <Toast key={Math.random()} text={text} type={type} />
                                        ))}
                                    </div>
                                )}
                                <BookingCalendar />
                                {isOpenReviewModal && <ModalRateBook />}
                            </div>
                        </BlockedUsersCheckedContext.Provider>
                    </BookHoldersCheckedContext.Provider>
                </AllUsersCheckedContext.Provider>
            </DeliveriedCheckedContext.Provider>
        </BookedCheckedContext.Provider>
    );
};
