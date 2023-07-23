import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames';

import { ROUTES } from '../../constants/routes';

import styles from './admin-navigation.module.scss';

export const AdminNavigation = () => {
    const { pathname } = useLocation();
    const [booked, setBooked] = useState(true);
    const [issued, setIssued] = useState(true);
    const [allUsers, setAllUsers] = useState(true);

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
                            onChange={() => setBooked(!booked)}
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
                            checked={issued}
                            onChange={() => setIssued(!issued)}
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
