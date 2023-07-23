import React, { useState } from 'react';
import classNames from 'classnames';

import { MenuViewEnum } from '../../constants/menu-view';
import { getBookList } from '../../store/books/selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Button } from '../button';
import { Search } from '../search';
import { Sorting } from '../sorting';
import { searchSelector } from '../../store/search/selectors';
import { SORTING_FILTERS } from '../../constants/sorting-filters';
import { bookListRequestNull, bookListRequestScroll } from '../../store/books';

import displayList from './assets/icon-line.svg';
import displayListActive from './assets/icon-line-active.svg';
import displayWindow from './assets/icon-square.svg';
import displayWindowActive from './assets/icon-square-active.svg';
import iconClose from './assets/icon-close.svg';

import styles from './menu.module.scss';
import { setSortMethodRatingDecr } from '../../store/search';

export type MenyProps = {
    menuView: MenuViewEnum;
    setMenuView: (onChangeText: MenuViewEnum) => void;
    onCheckbox: () => void;
    setCurrentPage: (onChangeText: number) => void;
};

export const Menu = ({ menuView, setMenuView, onCheckbox, setCurrentPage }: MenyProps) => {
    const [isSearhView, setSearhView] = useState(true);
    const [isSortView, setIsSortView] = useState(true);
    const [checkbox, setCheckbox] = useState(false);
    const [isSortingShow, setIsSortingShow] = useState(false);
    const [isSorting, setIsSorting] = useState(false);
    const bookList = useAppSelector(getBookList);
    const { isSortedDesc, isSortingByRating } = useAppSelector(searchSelector);
    const dispatch = useAppDispatch();

    const resetSortingFilter = () => {
        setIsSorting(false);
        dispatch(setSortMethodRatingDecr());
        dispatch(bookListRequestNull());
        dispatch(bookListRequestScroll(1));
    };

    return (
        <div
            className={classNames(
                styles.menu,
                !isSearhView && styles.menuSearh,
                isSortingShow && styles.menuAdapt,
                isSorting && styles.menuWithSortingFilter,
            )}
        >
            {bookList && (
                <React.Fragment>
                    <div
                        className={classNames(
                            styles.searchSortBlock,
                            !isSearhView && styles.searchSortBlockNoGap,
                            isSortingShow && styles.searchSortBlockAdapt,
                        )}
                    >
                        <Search
                            isSearhView={isSearhView}
                            setSearhView={setSearhView}
                            isSortView={isSortView}
                        />
                        <Sorting
                            isSortView={isSortView}
                            setIsSortView={setIsSortView}
                            isSearhView={isSearhView}
                            isSortingShow={isSortingShow}
                            setIsSortingShow={setIsSortingShow}
                            setCurrentPage={setCurrentPage}
                            setIsSorting={setIsSorting}
                        />
                    </div>
                    {isSearhView && isSortView && (
                        <div className={styles.display}>
                            <div className={styles.hideBooking}>
                                <input
                                    type='checkbox'
                                    id='hidebooking'
                                    className={styles.hideBookingInput}
                                    checked={checkbox}
                                    onChange={() => setCheckbox(!checkbox)}
                                    onClick={() => onCheckbox()}
                                />
                                <label htmlFor='hidebooking' className={styles.hideBookingLabel}>
                                    Скрыть бронь
                                </label>
                            </div>
                            <Button
                                classButton={classNames(
                                    styles.buttonDisplay,
                                    menuView === MenuViewEnum.window && styles.buttonDisplayActive,
                                )}
                                onClick={() => {
                                    setMenuView(MenuViewEnum.window);
                                }}
                                dataTestId='button-menu-view-window'
                            >
                                <img
                                    src={
                                        menuView === MenuViewEnum.window
                                            ? displayWindowActive
                                            : displayWindow
                                    }
                                    alt='icon-window'
                                />
                            </Button>
                            <Button
                                classButton={classNames(
                                    styles.buttonDisplay,
                                    menuView === MenuViewEnum.list && styles.buttonDisplayActive,
                                )}
                                onClick={() => {
                                    setMenuView(MenuViewEnum.list);
                                }}
                                dataTestId='button-menu-view-list'
                            >
                                <img
                                    src={
                                        menuView === MenuViewEnum.list
                                            ? displayListActive
                                            : displayList
                                    }
                                    alt='icon-list'
                                />
                            </Button>
                        </div>
                    )}
                </React.Fragment>
            )}
            <div
                className={classNames(
                    styles.sortingFilter,
                    isSorting && styles.sortingFilterActive,
                )}
            >
                <span className={styles.sortingFilterText}>
                    {isSortingByRating && !isSortedDesc
                        ? SORTING_FILTERS.downRating
                        : isSortingByRating && isSortedDesc
                        ? SORTING_FILTERS.upRating
                        : !isSortingByRating && !isSortedDesc
                        ? SORTING_FILTERS.upAlphabet
                        : !isSortingByRating && isSortedDesc
                        ? SORTING_FILTERS.downAlphabet
                        : null}
                </span>
                <button
                    type='button'
                    onClick={resetSortingFilter}
                    className={styles.sortingFilterBtn}
                >
                    <img src={iconClose} alt='icon-close' />
                </button>
            </div>
        </div>
    );
};
