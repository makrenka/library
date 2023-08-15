import { NavLink, useLocation } from 'react-router-dom';
import { ReactNode, useContext, useState } from 'react';
import classNames from 'classnames';

import { ROUTES } from '../../constants/routes';
import {
    AllUsersCheckedContext,
    BlockedUsersCheckedContext,
    BookHoldersCheckedContext,
    BookedCheckedContext,
    DeliveriedCheckedContext,
} from '../layout/layout';

import styles from './admin-navigation.module.scss';

type AdminBurgerNavigationProps = {
    children?: ReactNode;
};

export const AdminBurgerNavigation = ({ children }: AdminBurgerNavigationProps) => {
    const { pathname } = useLocation();
    const [booked, setBooked] = useState(true);
    const [deliveried, setDeliveried] = useState(true);
    const [allUsers, setAllUsers] = useState(true);
    const [bookHolders, setBookHolders] = useState(false);
    const [blockedUsers, setBlockedUsers] = useState(false);

    const { setIsBookedChecked } = useContext(BookedCheckedContext);
    const { setIsDeliveriedChecked } = useContext(DeliveriedCheckedContext);
    const { setIsAllUsersChecked } = useContext(AllUsersCheckedContext);
    const { setIsBookHoldersChecked } = useContext(BookHoldersCheckedContext);
    const { setIsBlockedUsersChecked } = useContext(BlockedUsersCheckedContext);

    const handleBookedChecked = () => {
        setBooked(!booked);
        setIsBookedChecked?.(!booked);
    };

    const handleDeliveriedChecked = () => {
        setDeliveried(!deliveried);
        setIsDeliveriedChecked?.(!deliveried);
    };

    const handleAllUsersChecked = () => {
        setAllUsers(!allUsers);
        setIsAllUsersChecked?.(!allUsers);
        setBookHolders(false);
        setIsBookHoldersChecked?.(false);
        setBlockedUsers(false);
        setIsBlockedUsersChecked?.(false);
    };

    const handleBookHoldersChecked = () => {
        setBookHolders(!bookHolders);
        setIsBookHoldersChecked?.(!bookHolders);
        setAllUsers(false);
        setIsAllUsersChecked?.(false);
    };

    const handleBlockedUsersChecked = () => {
        setBlockedUsers(!blockedUsers);
        setIsBlockedUsersChecked?.(!blockedUsers);
        setAllUsers(false);
        setIsAllUsersChecked?.(false);
    };

    return (
        <nav className={styles.adminNav}>
            <NavLink
                to={ROUTES.adminBooks}
                className={({ isActive }) =>
                    isActive ? classNames(styles.navItem, styles.navItemActive) : styles.navItem
                }
            >
                Книги для брони
            </NavLink>
            <div className={styles.books}>
                <ul
                    className={classNames(
                        styles.filters,
                        pathname.includes('users') && styles.filtersHide,
                    )}
                >
                    <li className={styles.filtersItem}>
                        <input
                            type='checkbox'
                            id='isburgerbooking'
                            className={styles.filtersItemInput}
                            checked={booked}
                            onChange={handleBookedChecked}
                        />
                        <label htmlFor='isburgerbooking' className={styles.filtersItemLabel}>
                            Забронирована
                        </label>
                    </li>
                    <li className={styles.filtersItem}>
                        <input
                            type='checkbox'
                            id='isburgerdelivery'
                            className={styles.filtersItemInput}
                            checked={deliveried}
                            onChange={handleDeliveriedChecked}
                        />
                        <label htmlFor='isburgerdelivery' className={styles.filtersItemLabel}>
                            Выдана
                        </label>
                    </li>
                </ul>
            </div>

            <div
                className={classNames(styles.users, pathname.includes('users') && styles.usersTop)}
            >
                <NavLink
                    to={ROUTES.adminUsers}
                    className={({ isActive }) =>
                        isActive ? classNames(styles.navItem, styles.navItemActive) : styles.navItem
                    }
                >
                    Пользователи
                </NavLink>
                <div className={styles.usersWrapper}>
                    <ul
                        className={classNames(
                            styles.filters,
                            pathname.includes('books') && styles.filtersHide,
                        )}
                    >
                        <li className={styles.filtersItem}>
                            <input
                                type='checkbox'
                                id='allburger'
                                className={styles.filtersItemInput}
                                checked={allUsers}
                                onChange={handleAllUsersChecked}
                            />
                            <label htmlFor='allburger' className={styles.filtersItemLabel}>
                                Все
                            </label>
                        </li>
                        <li className={styles.filtersItem}>
                            <input
                                type='checkbox'
                                id='bookholdersburger'
                                className={styles.filtersItemInput}
                                checked={bookHolders}
                                onChange={handleBookHoldersChecked}
                            />
                            <label htmlFor='bookholdersburger' className={styles.filtersItemLabel}>
                                Держатели книг
                            </label>
                        </li>
                        <li className={styles.filtersItem}>
                            <input
                                type='checkbox'
                                id='blockedburger'
                                className={styles.filtersItemInput}
                                checked={blockedUsers}
                                onChange={handleBlockedUsersChecked}
                            />
                            <label htmlFor='blockedburger' className={styles.filtersItemLabel}>
                                Заблокированые
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
            {children}
        </nav>
    );
};
