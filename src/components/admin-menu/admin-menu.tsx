import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { Search } from '../search';
import { Button } from '../button';
import {
    AllUsersCheckedContext,
    BlockedUsersCheckedContext,
    BookHoldersCheckedContext,
    BookedCheckedContext,
    DeliveriedCheckedContext,
} from '../layout/layout';
import { BUTTON_FILTERS } from '../../constants/button';

import styles from './admin-menu.module.scss';

import sortDesc from './assets/sort-desc.svg';
import sortAsc from './assets/sort-asc.svg';
import iconClose from './assets/icon-close.svg';

export type AdminMenuProps = {
    setIsSortedDesc: (onChangeText: boolean) => void;
    isSortedDesc: boolean;
};

export const AdminMenu = ({ setIsSortedDesc, isSortedDesc }: AdminMenuProps) => {
    const [isSearhView, setSearhView] = useState(true);
    const [isSortView, setIsSortView] = useState(true);

    const { pathname } = useLocation();

    const { isBookedChecked, setIsBookedChecked } = useContext(BookedCheckedContext);
    const { isDeliveriedChecked, setIsDeliveriedChecked } = useContext(DeliveriedCheckedContext);
    const { isAllUsersChecked, setIsAllUsersChecked } = useContext(AllUsersCheckedContext);
    const { isBookHoldersChecked, setIsBookHoldersChecked } = useContext(BookHoldersCheckedContext);
    const { isBlockedUsersChecked, setIsBlockedUsersChecked } = useContext(
        BlockedUsersCheckedContext,
    );

    return (
        <div className={styles.adminMenu}>
            <div className={styles.filters}>
                {pathname.includes('books') ? (
                    <>
                        <div
                            className={classNames(
                                styles.filtersBtn,
                                isBookedChecked && styles.filtersBtnActive,
                            )}
                        >
                            <span>{BUTTON_FILTERS.reserved}</span>
                            <Button onClick={() => setIsBookedChecked(false)}>
                                <img src={iconClose} alt='icon-close' />
                            </Button>
                        </div>
                        <div
                            className={classNames(
                                styles.filtersBtn,
                                isDeliveriedChecked && styles.filtersBtnActive,
                            )}
                        >
                            <span>{BUTTON_FILTERS.deliveried}</span>
                            <Button onClick={() => setIsDeliveriedChecked(false)}>
                                <img src={iconClose} alt='icon-close' />
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <div
                            className={classNames(
                                styles.filtersBtn,
                                isBookHoldersChecked && styles.filtersBtnActive,
                            )}
                        >
                            <span>{BUTTON_FILTERS.bookHolders}</span>
                            <Button onClick={() => setIsBookHoldersChecked(false)}>
                                <img src={iconClose} alt='icon-close' />
                            </Button>
                        </div>
                        <div
                            className={classNames(
                                styles.filtersBtn,
                                isBlockedUsersChecked && styles.filtersBtnActive,
                            )}
                        >
                            <span>{BUTTON_FILTERS.blocked}</span>
                            <Button onClick={() => setIsBlockedUsersChecked(false)}>
                                <img src={iconClose} alt='icon-close' />
                            </Button>
                        </div>
                    </>
                )}
            </div>
            <div className={styles.searchWrapper}>
                <Search
                    isSearhView={isSearhView}
                    setSearhView={setSearhView}
                    isSortView={isSortView}
                />
                <Button
                    classButton={classNames(
                        styles.buttonSort,
                        !isSearhView && styles.buttonSortUnactive,
                    )}
                    onClick={() => setIsSortedDesc(!isSortedDesc)}
                >
                    <span>{isSortedDesc ? 'Сортировка от А до Я' : 'Сортировка от Я до А'}</span>
                    <img
                        src={isSortedDesc ? sortDesc : sortAsc}
                        alt='icon-sort'
                        className={styles.buttonSortImg}
                    />
                </Button>
                <Button
                    classButton={classNames(
                        styles.buttonSortAdapt,
                        !isSearhView && styles.buttonSortAdaptUnactive,
                    )}
                    onClick={() => setIsSortedDesc(!isSortedDesc)}
                >
                    <img
                        src={isSortedDesc ? sortDesc : sortAsc}
                        alt='icon-sort'
                        className={styles.buttonSortImg}
                    />
                </Button>
            </div>
        </div>
    );
};
