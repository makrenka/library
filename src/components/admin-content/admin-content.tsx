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
import { AdminCardUser } from '../admin-card-user';

export type AdminContentProps = {
    isSortedDesc: boolean;
    isBookedChecked: boolean;
    isDeliveriedChecked: boolean;
    contentView: string;
    isBookHoldersChecked: boolean;
    isBlockedUsersChecked: boolean;
    isAllUsersChecked: boolean;
};

export const AdminContent = ({
    isSortedDesc,
    isBookedChecked,
    isDeliveriedChecked,
    contentView,
    isBookHoldersChecked,
    isBlockedUsersChecked,
    isAllUsersChecked,
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
                    ? a.lastName.localeCompare(b.lastName)
                    : b.lastName.localeCompare(a.lastName),
            );
            setDataUsers(sortedByAlphabet);
        }
    }, [usersList, isSortedDesc]);

    return (
        <main className={styles.adminContent}>
            {contentView === 'books' ? (
                dataBook?.length && isBookedChecked && isDeliveriedChecked ? (
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
                )
            ) : dataUsers &&
              isAllUsersChecked &&
              !isBookHoldersChecked &&
              !isBlockedUsersChecked ? (
                <ul className={styles.adminContentList}>
                    {dataUsers.map((user) => (
                        <div key={user.id}>
                            <AdminCardUser dataUsers={user} />
                        </div>
                    ))}
                </ul>
            ) : dataUsers && isBookHoldersChecked && !isBlockedUsersChecked ? (
                <ul className={styles.adminContentList}>
                    {(dataUsers as ResponseUsersList[])
                        .filter((user) => user.delivery.handed)
                        .map((user) => (
                            <div key={user.id}>
                                <AdminCardUser dataUsers={user} />
                            </div>
                        ))}
                </ul>
            ) : dataUsers && !isBookHoldersChecked && isBlockedUsersChecked ? (
                <ul className={styles.adminContentList}>
                    {(dataUsers as ResponseUsersList[])
                        .filter((user) => user.blocked)
                        .map((user) => (
                            <div key={user.id}>
                                <AdminCardUser dataUsers={user} />
                            </div>
                        ))}
                </ul>
            ) : dataUsers && isBookHoldersChecked && isBlockedUsersChecked ? (
                <ul className={styles.adminContentList}>
                    {(dataUsers as ResponseUsersList[])
                        .filter((user) => user.blocked || user.delivery.handed)
                        .map((user) => (
                            <div key={user.id}>
                                <AdminCardUser dataUsers={user} />
                            </div>
                        ))}
                </ul>
            ) : (
                <div className={styles.emptyDataText}>Ничего не выбрано</div>
            )}
        </main>
    );
};
