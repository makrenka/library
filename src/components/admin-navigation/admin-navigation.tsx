import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames';

import { ROUTES } from '../../constants/routes';

import styles from './admin-navigation.module.scss';

type AdminNavigationProps = {
    setIsBookedChecked: (onChangeText: boolean) => void;
    setIsDeliveriedChecked: (onChangeText: boolean) => void;
};

export const AdminNavigation = ({ setIsBookedChecked, setIsDeliveriedChecked }: AdminNavigationProps) => {
    const { pathname } = useLocation();
    const [booked, setBooked] = useState(true);
    const [deliveried, setDeliveried] = useState(true);
    const [allUsers, setAllUsers] = useState(true);

    const handleBookedChecked = () => {
        setBooked(!booked);
        setIsBookedChecked(!booked);
    };

    const handleDeliveriedChecked = () => {
        setDeliveried(!deliveried);
        setIsDeliveriedChecked(!deliveried);
    }

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
                            id='isbooking'
                            className={styles.filtersItemInput}
                            checked={booked}
                            onChange={handleBookedChecked}
                        />
                        <label htmlFor='isbooking' className={styles.filtersItemLabel}>
                            Забронирована
                        </label>
                    </li>
                    <li className={styles.filtersItem}>
                        <input
                            type='checkbox'
                            id='isdelivery'
                            className={styles.filtersItemInput}
                            checked={deliveried}
                            onChange={handleDeliveriedChecked}
                        />
                        <label htmlFor='isdelivery' className={styles.filtersItemLabel}>
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
                                id='all'
                                className={styles.filtersItemInput}
                                checked={allUsers}
                                onChange={() => setAllUsers(!allUsers)}
                            />
                            <label htmlFor='all' className={styles.filtersItemLabel}>
                                Все
                            </label>
                        </li>
                        <li className={styles.filtersItem}>
                            <input
                                type='checkbox'
                                id='bookholders'
                                className={styles.filtersItemInput}
                            />
                            <label htmlFor='bookholders' className={styles.filtersItemLabel}>
                                Держатели книг
                            </label>
                        </li>
                        <li className={styles.filtersItem}>
                            <input
                                type='checkbox'
                                id='blocked'
                                className={styles.filtersItemInput}
                            />
                            <label htmlFor='blocked' className={styles.filtersItemLabel}>
                                Заблокированые
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
