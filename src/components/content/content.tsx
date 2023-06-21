import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { MenuViewEnum } from '../../constants/menu-view';
import { NAV_MENU_ALL } from '../../constants/nav-menu-list';
import { bookListRequest } from '../../store/books';
import { getBookCategories, getBookList } from '../../store/books/selectors';
import { BookListItem } from '../../store/books/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { searchSelector } from '../../store/search/selectors';
import { Card } from '../card';

import styles from './content.module.scss';

type ContentProps = {
    menuView: string;
};

export const Content = ({ menuView }: ContentProps) => {
    const [data, setData] = useState<BookListItem[] | null>(null);
    const [activeCategory, setActiveCategory] = useState('');
    const dispatch = useAppDispatch();
    const { category } = useParams();
    const bookList = useAppSelector(getBookList);
    const bookCategories = useAppSelector(getBookCategories);
    const { filter, isSortedDesc } = useAppSelector(searchSelector);

    useEffect(() => {
        dispatch(bookListRequest());
    }, [dispatch]);

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

            setData(sortedByRating);
        }
    }, [category, filter, bookList, isSortedDesc, activeCategory]);

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
                        {data?.map((book) => (
                            <Card data={book} key={book.id} menuView={menuView} />
                        ))}
                    </ul>
                ))}
        </main>
    );
};
