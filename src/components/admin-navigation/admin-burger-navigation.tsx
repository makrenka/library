import { NavLink, useLocation } from 'react-router-dom';
import { ReactNode, useContext } from 'react';
import classNames from 'classnames';

import { ROUTES } from '../../constants/routes';
import {
    AllUsersCheckedContext,
    BlockedUsersCheckedContext,
    BookHoldersCheckedContext,
    BookedCheckedContext,
    DeliveriedCheckedContext,
} from '../layout/layout';
import { BUTTON_FILTERS } from '../../constants/button';

import styles from './admin-navigation.module.scss';

type AdminBurgerNavigationProps = {
    children?: ReactNode;
};

export const AdminBurgerNavigation = ({ children }: AdminBurgerNavigationProps) => {
    const { pathname } = useLocation();

    const { isBookedChecked, setIsBookedChecked } = useContext(BookedCheckedContext);
    const { isDeliveriedChecked, setIsDeliveriedChecked } = useContext(DeliveriedCheckedContext);
    const { isAllUsersChecked, setIsAllUsersChecked } = useContext(AllUsersCheckedContext);
    const { isBookHoldersChecked, setIsBookHoldersChecked } = useContext(BookHoldersCheckedContext);
    const { isBlockedUsersChecked, setIsBlockedUsersChecked } = useContext(
        BlockedUsersCheckedContext,
    );

    const handleBookedChecked = () => {
        setIsBookedChecked?.(!isBookedChecked);
    };

    const handleDeliveriedChecked = () => {
        setIsDeliveriedChecked?.(!isDeliveriedChecked);
    };

    const handleAllUsersChecked = () => {
        setIsAllUsersChecked?.(!isAllUsersChecked);
        setIsBookHoldersChecked?.(false);
        setIsBlockedUsersChecked?.(false);
    };

    const handleBookHoldersChecked = () => {
        setIsBookHoldersChecked?.(!isBookHoldersChecked);
        setIsAllUsersChecked?.(false);
    };

    const handleBlockedUsersChecked = () => {
        setIsBlockedUsersChecked?.(!isBlockedUsersChecked);
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
                            checked={isBookedChecked}
                            onChange={handleBookedChecked}
                        />
                        <label htmlFor='isburgerbooking' className={styles.filtersItemLabel}>
                            {BUTTON_FILTERS.reserved}
                        </label>
                    </li>
                    <li className={styles.filtersItem}>
                        <input
                            type='checkbox'
                            id='isburgerdelivery'
                            className={styles.filtersItemInput}
                            checked={isDeliveriedChecked}
                            onChange={handleDeliveriedChecked}
                        />
                        <label htmlFor='isburgerdelivery' className={styles.filtersItemLabel}>
                            {BUTTON_FILTERS.deliveried}
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
                                checked={isAllUsersChecked}
                                onChange={handleAllUsersChecked}
                            />
                            <label htmlFor='allburger' className={styles.filtersItemLabel}>
                                {BUTTON_FILTERS.all}
                            </label>
                        </li>
                        <li className={styles.filtersItem}>
                            <input
                                type='checkbox'
                                id='bookholdersburger'
                                className={styles.filtersItemInput}
                                checked={isBookHoldersChecked}
                                onChange={handleBookHoldersChecked}
                            />
                            <label htmlFor='bookholdersburger' className={styles.filtersItemLabel}>
                                {BUTTON_FILTERS.bookHolders}
                            </label>
                        </li>
                        <li className={styles.filtersItem}>
                            <input
                                type='checkbox'
                                id='blockedburger'
                                className={styles.filtersItemInput}
                                checked={isBlockedUsersChecked}
                                onChange={handleBlockedUsersChecked}
                            />
                            <label htmlFor='blockedburger' className={styles.filtersItemLabel}>
                                {BUTTON_FILTERS.blocked}
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
            {children}
        </nav>
    );
};
