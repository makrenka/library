import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { MenuViewEnum } from '../../constants/menu-view';
import { NAV_MENU_ALL } from '../../constants/nav-menu-list';
import {
    bookListRequestNull,
    bookListRequestScroll,
    bookListRequestSortingAlphabetAsc,
    bookListRequestSortingAlphabetDesc,
} from '../../store/books';
import { getBookCategories, getBookList } from '../../store/books/selectors';
import { BookListItem } from '../../store/books/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { searchSelector } from '../../store/search/selectors';
import { Card } from '../card';

import styles from './content.module.scss';

type ContentProps = {
    menuView: string;
    checkboxChecked: boolean;
    setCurrentPage: any;
    currentPage: number;
};

export const Content = ({
    menuView,
    checkboxChecked,
    currentPage,
    setCurrentPage,
}: ContentProps) => {
    const [data, setData] = useState<BookListItem[] | null>(null);
    const [lastElement, setLastElement] = useState<HTMLDivElement | null>(null);
    const [activeCategory, setActiveCategory] = useState('');
    const dispatch = useAppDispatch();
    const { category } = useParams();
    const bookList = useAppSelector(getBookList);
    const bookCategories = useAppSelector(getBookCategories);
    const { filter, isSortedDesc, isSortingByRating } = useAppSelector(searchSelector);

    const TOTAL_PAGES = 12;

    const observer = useRef(
        new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && currentPage <= TOTAL_PAGES) {
                setCurrentPage((currentPage: number) => currentPage + 1);
            }
        }),
    );

    useEffect(() => {
        if (isSortingByRating && currentPage === 1) {
            dispatch(bookListRequestNull());
        }
    }, [dispatch, isSortingByRating, currentPage]);

    useEffect(() => {
        if (isSortingByRating) {
            dispatch(bookListRequestScroll(currentPage));
        }
    }, [dispatch, isSortingByRating, currentPage]);

    useEffect(() => {
        if (!isSortingByRating && isSortedDesc && currentPage !== 1) {
            dispatch(bookListRequestSortingAlphabetAsc(currentPage));
        } else if (!isSortingByRating && !isSortedDesc && currentPage !== 1) {
            dispatch(bookListRequestSortingAlphabetDesc(currentPage));
        }
    }, [dispatch, isSortingByRating, currentPage, isSortedDesc]);

    useEffect(() => {
        if (!isSortingByRating && isSortedDesc && currentPage === 1) {
            dispatch(bookListRequestNull());
            dispatch(bookListRequestSortingAlphabetAsc(currentPage));
        } else if (!isSortingByRating && !isSortedDesc && currentPage === 1) {
            dispatch(bookListRequestNull());
            dispatch(bookListRequestSortingAlphabetDesc(currentPage));
        }
    }, [dispatch, isSortingByRating, currentPage, isSortedDesc]);

    useEffect(() => {
        const currentElement = lastElement;
        const currentObserver = observer.current;

        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        };
    }, [lastElement]);

    const listClassName = classNames(
        menuView === MenuViewEnum.window ? styles.viewWindow : styles.viewList,
    );

    useEffect(() => {
        bookCategories?.forEach(({ name, path }) => {
            if (path === category) {
                setActiveCategory(name);
            }
        });
    }, [category, bookCategories]);

    useEffect(() => {
        if (bookList) {
            const filteredByCategory =
                category === NAV_MENU_ALL.category
                    ? bookList
                    : bookList.filter(({ categories }) => categories?.includes(activeCategory));

            const searchResult =
                filter.length > 0
                    ? filteredByCategory.filter(({ title }) => title.toLowerCase().includes(filter))
                    : filteredByCategory;

            const sortedByRating = [...searchResult].sort((a, b) =>
                isSortedDesc ? b.rating - a.rating : a.rating - b.rating,
            );

            if (isSortingByRating) {
                setData(sortedByRating);
            } else {
                setData(bookList);
            }
        }
    }, [
        category,
        filter,
        bookList,
        isSortedDesc,
        activeCategory,
        isSortingByRating,
        dispatch,
        currentPage,
    ]);

    return (
        <main data-test-id='content'>
            {bookList &&
                bookCategories &&
                (data && data.length === 0 ? (
                    filter ? (
                        <div
                            className={styles.emptyDataText}
                            data-test-id='search-result-not-found'
                        >
                            По запросу ничего не найдено
                        </div>
                    ) : (
                        <div className={styles.emptyDataText} data-test-id='empty-category'>
                            В этой категории книг ещё нет
                        </div>
                    )
                ) : (
                    <ul
                        className={classNames(
                            menuView === MenuViewEnum.window ? styles.viewWindow : styles.viewList,
                            listClassName,
                        )}
                        data-test-id='cards-list'
                    >
                        {data
                            ?.filter((book) => (checkboxChecked ? book.booking === null : book))
                            .map((book) => (
                                <div key={book.id} ref={setLastElement}>
                                    <Card data={book} menuView={menuView} />
                                </div>
                            ))}
                    </ul>
                ))}
        </main>
    );
};
