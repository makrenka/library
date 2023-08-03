import { useEffect, useState } from 'react';

import { getBookList } from '../../store/books/selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { bookListRequestBooked, bookListRequestNull } from '../../store/books';
import { BookListItem } from '../../store/books/types';
import { Card } from '../card';

import styles from './admin-content.module.scss';
import { ResponseUsersList } from '../../store/user/types';
import { getUsersListSelector } from '../../store/user/selectors';
import { usersListRequest } from '../../store/user';

export type AdminContentProps = {
    isSortedDesc: boolean;
    isBookedChecked: boolean;
    isDeliveriedChecked: boolean;
    contentView: string;
};

export const AdminContent = ({
    isSortedDesc,
    isBookedChecked,
    isDeliveriedChecked,
    contentView,
}: AdminContentProps) => {
    const [dataBook, setDataBook] = useState<BookListItem[] | null>(null);
    const [dataUsers, setDataUsers] = useState<ResponseUsersList[] | null>(null);
    const bookList = useAppSelector(getBookList);
    const usersList = useAppSelector(getUsersListSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(bookListRequestNull());
        dispatch(bookListRequestBooked());
    }, [dispatch]);

    useEffect(() => {
        dispatch(usersListRequest());
    }, [dispatch]);

    useEffect(() => {
        if (bookList) {
            const data = [...bookList];
            const sortedByAlphabet = data.sort((a, b) =>
                isSortedDesc ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title),
            );
            setDataBook(sortedByAlphabet);
        }
    }, [bookList, isSortedDesc]);

    useEffect(() => {
        if (usersList.data) {
            const data = [...usersList.data];
            const sortedByAlphabet = data?.sort((a, b) =>
                isSortedDesc
                    ? b.lastName.localeCompare(a.lastName)
                    : a.lastName.localeCompare(b.lastName),
            );
            setDataUsers(sortedByAlphabet);
        }
    }, [usersList, isSortedDesc]);

    return (
        <main className={styles.adminContent}>
            {dataBook?.length && isBookedChecked && isDeliveriedChecked ? (
                <ul className={styles.adminContentList}>
                    {dataBook.map((book) => (
                        <div key={book.id}>
                            <Card data={book} />
                        </div>
                    ))}
                </ul>
            ) : dataBook?.length && !isBookedChecked && isDeliveriedChecked ? (
                <ul className={styles.adminContentList}>
                    {dataBook
                        .filter((book) => book.booking == null)
                        .map((book) => (
                            <div key={book.id}>
                                <Card data={book} />
                            </div>
                        ))}
                </ul>
            ) : dataBook?.length && isBookedChecked && !isDeliveriedChecked ? (
                <ul className={styles.adminContentList}>
                    {dataBook
                        .filter((book) => book.delivery == null)
                        .map((book) => (
                            <div key={book.id}>
                                <Card data={book} />
                            </div>
                        ))}
                </ul>
            ) : (
                <div className={styles.emptyDataText}>Ничего не выбрано</div>
            )}
        </main>
    );
};
