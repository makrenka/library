import { useEffect, useState } from 'react';

import { getBookList } from '../../store/books/selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { bookListRequestBooked, bookListRequestNull } from '../../store/books';
import { BookListItem } from '../../store/books/types';
import { Card } from '../card';

import styles from './admin-content.module.scss';

export type AdminContentProps = {
    isSortedDesc: boolean;
    isBookedChecked: boolean;
};

export const AdminContent = ({ isSortedDesc, isBookedChecked }: AdminContentProps) => {
    const [data, setData] = useState<BookListItem[] | null>(null);
    const bookList = useAppSelector(getBookList);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(bookListRequestNull());
        dispatch(bookListRequestBooked());
    }, [dispatch]);

    useEffect(() => {
        if (bookList) {
            const data = [...bookList];
            const sortedByAlphabet = data.sort((a, b) =>
                isSortedDesc ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title),
            );
            setData(sortedByAlphabet);
        }
    }, [bookList, isSortedDesc]);

    return (
        <main className={styles.adminContent}>
            {data?.length && isBookedChecked ? (
                <ul className={styles.adminContentList}>
                    {data.map((book) => (
                        <div key={book.id}>
                            <Card data={book} />
                        </div>
                    ))}
                </ul>
            ) : (
                <div className={styles.emptyDataText}>По запросу ничего не найдено</div>
            )}
        </main>
    );
};
