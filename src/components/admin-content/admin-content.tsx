import { useContext, useEffect, useState } from 'react';

import { getBookListAdmin } from '../../store/books/selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    bookListRequestBooked,
    bookListRequestDeliveried,
    bookListRequestNull,
} from '../../store/books';
import { BookListItem } from '../../store/books/types';
import { ResponseUsersList } from '../../store/user/types';
import { getUsersListSelector } from '../../store/user/selectors';
import { usersListRequest } from '../../store/user';

import { Card } from '../card';
import { AdminCardUser } from '../admin-card-user';
import {
    AllUsersCheckedContext,
    BlockedUsersCheckedContext,
    BookHoldersCheckedContext,
    BookedCheckedContext,
    DeliveriedCheckedContext,
} from '../layout/layout';

import styles from './admin-content.module.scss';

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
    const bookList = useAppSelector(getBookListAdmin);
    const usersList = useAppSelector(getUsersListSelector);
    const dispatch = useAppDispatch();

    const burgerIsBookedChecked = useContext(BookedCheckedContext).isBookedChecked;
    const burgerIsDeliveriedChecked = useContext(DeliveriedCheckedContext).isDeliveriedChecked;
    const burgerIsAllUsersChecked = useContext(AllUsersCheckedContext).isAllUsersChecked;
    const burgerIsBookHoldersChecked = useContext(BookHoldersCheckedContext).isBookHoldersChecked;
    const burgerIsBlockedUsersChecked = useContext(
        BlockedUsersCheckedContext,
    ).isBlockedUsersChecked;

    useEffect(() => {
        dispatch(bookListRequestNull());
        dispatch(bookListRequestBooked());
        dispatch(bookListRequestDeliveried());
    }, [dispatch]);

    useEffect(() => {
        dispatch(usersListRequest());
    }, [dispatch, dataBook]);

    useEffect(() => {
        if (bookList) {
            const data = [...bookList];
            const sortedByAlphabet = data.sort((a, b) =>
                isSortedDesc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title),
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
                dataBook &&
                    isBookedChecked &&
                    isDeliveriedChecked &&
                    burgerIsBookedChecked &&
                    burgerIsDeliveriedChecked ? (
                    <ul className={styles.adminContentList}>
                        {dataBook.map((book) => (
                            <div key={book.id}>
                                <Card data={book} />
                            </div>
                        ))}
                    </ul>
                ) : !isBookedChecked &&
                    isDeliveriedChecked &&
                    burgerIsBookedChecked &&
                    burgerIsDeliveriedChecked &&
                    dataBook?.filter((book) => book.delivery).length === 0 ? (
                    <div className={styles.emptyDataText}>Нет выданных книг</div>
                ) : isBookedChecked &&
                    isDeliveriedChecked &&
                    !burgerIsBookedChecked &&
                    burgerIsDeliveriedChecked &&
                    dataBook?.filter((book) => book.delivery).length === 0 ? (
                    <div className={styles.emptyDataText}>Нет выданных книг</div>
                ) : dataBook &&
                    !isBookedChecked &&
                    isDeliveriedChecked &&
                    burgerIsBookedChecked &&
                    burgerIsDeliveriedChecked ? (
                    <ul className={styles.adminContentList}>
                        {dataBook
                            .filter((book) => book.delivery)
                            .map((book) => (
                                <div key={book.id}>
                                    <Card data={book} />
                                </div>
                            ))}
                    </ul>
                ) : dataBook &&
                    isBookedChecked &&
                    isDeliveriedChecked &&
                    !burgerIsBookedChecked &&
                    burgerIsDeliveriedChecked ? (
                    <ul className={styles.adminContentList}>
                        {dataBook
                            .filter((book) => book.delivery)
                            .map((book) => (
                                <div key={book.id}>
                                    <Card data={book} />
                                </div>
                            ))}
                    </ul>
                ) : isBookedChecked &&
                    !isDeliveriedChecked &&
                    burgerIsBookedChecked &&
                    burgerIsDeliveriedChecked &&
                    dataBook?.filter((book) => book.booking).length === 0 ? (
                    <div className={styles.emptyDataText}>Никто не бронировал книг</div>
                ) : isBookedChecked &&
                    isDeliveriedChecked &&
                    burgerIsBookedChecked &&
                    !burgerIsDeliveriedChecked &&
                    dataBook?.filter((book) => book.booking).length === 0 ? (
                    <div className={styles.emptyDataText}>Никто не бронировал книг</div>
                ) : dataBook &&
                    isBookedChecked &&
                    !isDeliveriedChecked &&
                    burgerIsBookedChecked &&
                    burgerIsDeliveriedChecked ? (
                    <ul className={styles.adminContentList}>
                        {dataBook
                            .filter((book) => book.booking)
                            .map((book) => (
                                <div key={book.id}>
                                    <Card data={book} />
                                </div>
                            ))}
                    </ul>
                ) : dataBook &&
                    isBookedChecked &&
                    isDeliveriedChecked &&
                    burgerIsBookedChecked &&
                    !burgerIsDeliveriedChecked ? (
                    <ul className={styles.adminContentList}>
                        {dataBook
                            .filter((book) => book.booking)
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
                !isBlockedUsersChecked &&
                burgerIsAllUsersChecked &&
                !burgerIsBookHoldersChecked &&
                !burgerIsBlockedUsersChecked ? (
                <ul className={styles.adminContentList}>
                    {dataUsers.map((user) => (
                        <div key={user.id}>
                            <AdminCardUser dataUsers={user} />
                        </div>
                    ))}
                </ul>
            ) : dataUsers &&
                isBookHoldersChecked &&
                !isBlockedUsersChecked &&
                burgerIsAllUsersChecked &&
                !burgerIsBookHoldersChecked &&
                !burgerIsBlockedUsersChecked ? (
                <ul className={styles.adminContentList}>
                    {(dataUsers as ResponseUsersList[])
                        .filter((user) => user.delivery.handed && !user.blocked)
                        .map((user) => (
                            <div key={user.id}>
                                <AdminCardUser dataUsers={user} />
                            </div>
                        ))}
                </ul>
            ) : dataUsers &&
                isAllUsersChecked &&
                !isBookHoldersChecked &&
                !isBlockedUsersChecked &&
                burgerIsBookHoldersChecked &&
                !burgerIsBlockedUsersChecked ? (
                <ul className={styles.adminContentList}>
                    {(dataUsers as ResponseUsersList[])
                        .filter((user) => user.delivery.handed && !user.blocked)
                        .map((user) => (
                            <div key={user.id}>
                                <AdminCardUser dataUsers={user} />
                            </div>
                        ))}
                </ul>
            ) : dataUsers &&
                isBookHoldersChecked &&
                isBlockedUsersChecked &&
                burgerIsAllUsersChecked &&
                !burgerIsBookHoldersChecked &&
                !burgerIsBlockedUsersChecked ? (
                <ul className={styles.adminContentList}>
                    {(dataUsers as ResponseUsersList[])
                        .filter((user) => user.delivery.handed || user.blocked)
                        .map((user) => (
                            <div key={user.id}>
                                <AdminCardUser dataUsers={user} />
                            </div>
                        ))}
                </ul>
            ) : dataUsers &&
                isAllUsersChecked &&
                !isBookHoldersChecked &&
                !isBlockedUsersChecked &&
                burgerIsBookHoldersChecked &&
                burgerIsBlockedUsersChecked ? (
                <ul className={styles.adminContentList}>
                    {(dataUsers as ResponseUsersList[])
                        .filter((user) => user.delivery.handed || user.blocked)
                        .map((user) => (
                            <div key={user.id}>
                                <AdminCardUser dataUsers={user} />
                            </div>
                        ))}
                </ul>
            ) : dataUsers &&
                !isBookHoldersChecked &&
                isBlockedUsersChecked &&
                burgerIsAllUsersChecked &&
                !burgerIsBookHoldersChecked &&
                !burgerIsBlockedUsersChecked ? (
                <ul className={styles.adminContentList}>
                    {(dataUsers as ResponseUsersList[])
                        .filter((user) => user.blocked)
                        .map((user) => (
                            <div key={user.id}>
                                <AdminCardUser dataUsers={user} />
                            </div>
                        ))}
                </ul>
            ) : dataUsers &&
                isAllUsersChecked &&
                !isBookHoldersChecked &&
                !isBlockedUsersChecked &&
                !burgerIsBookHoldersChecked &&
                burgerIsBlockedUsersChecked ? (
                <ul className={styles.adminContentList}>
                    {(dataUsers as ResponseUsersList[])
                        .filter((user) => user.blocked)
                        .map((user) => (
                            <div key={user.id}>
                                <AdminCardUser dataUsers={user} />
                            </div>
                        ))}
                </ul>
            ) : (
                dataUsers && <div className={styles.emptyDataText}>Ничего не выбрано</div>
            )}
        </main>
    );
};
