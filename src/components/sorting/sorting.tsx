import { useEffect } from 'react';
import classNames from 'classnames';

import { useClickOutside } from '../../hooks/use-click-outside';
import { Button } from '../button';
import { useAppDispatch } from '../../store/hooks';
import {
    setSortMethodAlphDecr,
    setSortMethodAlphIncr,
    setSortMethodRatingDecr,
    setSortMethodRatingIncr,
} from '../../store/search';

import sortAsc from './assets/sort-asc.svg';
import sortDesc from './assets/sort-desc.svg';
import sortArrow from './assets/sort-arrow.svg';
import iconClose from './assets/icon-close.svg';

import styles from './sorting.module.scss';

type SortProps = {
    isSortView: boolean;
    setIsSortView: (onChangeText: boolean) => void;
    isSearhView: boolean;
    isSortingShow: boolean;
    setIsSortingShow: (onChangeText: boolean) => void;
    setCurrentPage: (onChangeText: number) => void;
    setIsSorting: (onChangeText: boolean) => void;
};

export const Sorting = ({
    isSortView,
    setIsSortView,
    isSearhView,
    isSortingShow,
    setIsSortingShow,
    setCurrentPage,
    setIsSorting,
}: SortProps) => {
    const { ref, isShow, setIsShow } = useClickOutside(false);
    const dispatch = useAppDispatch();

    const handleSortRatingDecr = () => {
        dispatch(setSortMethodRatingDecr());
        setIsSorting(true);
    };

    const handleSortRatingIncr = () => {
        dispatch(setSortMethodRatingIncr());
        setIsSorting(true);
    };

    const handleSortAlphDecr = () => {
        dispatch(setSortMethodAlphDecr());
        setCurrentPage(1);
        setIsSorting(true);
    };

    const handleSortAlphIncr = () => {
        dispatch(setSortMethodAlphIncr());
        setCurrentPage(1);
        setIsSorting(true);
    };

    const handleSortView = () => {
        setIsSortView(!isSortView);
        setIsShow(!isShow);
        setIsSortingShow(!isSortingShow);
    };

    useEffect(() => {
        if (!isShow) {
            setIsSortView(true);
            setIsSortingShow(false);
        }
    }, [isShow, setIsSortView, setIsSortingShow]);

    return (
        <div className={classNames(styles.sortBlock, isShow && styles.sortBlockActive)} ref={ref}>
            <Button
                classButton={classNames(styles.buttonSort, isShow && styles.buttonSortActive)}
                onClick={() => setIsShow(!isShow)}
                dataTestId='sort-rating-button'
            >
                <span className={styles.buttonSortText}>Сортировка</span>
                <img
                    className={classNames(styles.sortArrow, isShow && styles.sortArrowActive)}
                    src={sortArrow}
                    alt='sort-arrow'
                />
                <img className={styles.iconClose} src={iconClose} alt='icon-close' />
            </Button>
            <Button
                classButton={classNames(
                    styles.buttonSortAdapt,
                    !isSearhView && styles.buttonHidden,
                    isShow && styles.buttonSortAdaptUnactive,
                )}
                onClick={handleSortView}
            />
            {/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
            <ul
                className={classNames(styles.listSort, isShow && styles.listSortActive)}
                onClick={() => setIsShow(!isShow)}
            >
                <li className={styles.sortItem} onClick={handleSortRatingDecr}>
                    По рейтингу
                    <img src={sortDesc} alt='icon-sort' />
                </li>
                <li className={styles.sortItem} onClick={handleSortRatingIncr}>
                    По рейтингу
                    <img src={sortAsc} alt='icon-sort' />
                </li>
                <li className={styles.sortItem} onClick={handleSortAlphDecr}>
                    По алфавиту
                    <img src={sortDesc} alt='icon-sort' />
                </li>
                <li className={styles.sortItem} onClick={handleSortAlphIncr}>
                    По алфавиту
                    <img src={sortAsc} alt='icon-sort' />
                </li>
            </ul>
        </div>
    );
};
