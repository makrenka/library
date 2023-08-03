import { SyntheticEvent } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { MenuViewEnum } from '../../constants/menu-view';
import { NAV_MENU_ALL, NAV_MENU_MAIN } from '../../constants/nav-menu-list';
import {
    bookingDeleteRequest,
    toggleBookReviewModal,
    toggleDeliveryModal,
} from '../../store/books';
import { BookListItem } from '../../store/books/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { searchbookList } from '../../store/search';
import { searchSelector } from '../../store/search/selectors';
import { formatDate } from '../../utils/date/date-utils';
import { highlightMatches } from '../../utils/highlight-matches';
import { BookingButton } from '../booking-button';
import { Button } from '../button';
import { Rating } from '../rating';
import { authSelector } from '../../store/auth/selectors';

import IconPlugImg from './assets/icon-plug-img.svg';

import styles from './card.module.scss';

type BookType = {
    data: BookListItem;
    menuView?: string;
    isProfileCard?: boolean;
    isHistory?: boolean;
    deliveryDate?: string | Date;
    userId?: number;
    isBooking?: boolean;
    bookingId?: number;
    isCommented?: boolean;
};

export const Card = (props: BookType) => {
    const {
        data: { rating, title, authors, id, issueYear, image, booking },
        data: bookData,
        menuView,
        isProfileCard,
        isHistory,
        deliveryDate,
        userId,
        isBooking,
        bookingId,
        isCommented,
    } = props;
    const dispatch = useAppDispatch();

    const { category } = useParams();
    const { pathname } = useLocation();
    const userIdReserved = bookData?.delivery?.recipientId;
    const {
        auth: { userData },
    } = useAppSelector(authSelector);

    const { filter } = useAppSelector(searchSelector);

    const linkPath = category
        ? `/${NAV_MENU_MAIN.books.path}/${category}/${id}`
        : `/${NAV_MENU_MAIN.books.path}/${NAV_MENU_ALL.category}/${id}`;

    const classNameCard = (name: string) =>
        classNames(
            menuView === MenuViewEnum.window ? styles[`${name}Window`] : styles[`${name}List`],
        );

    const handleHighlight = (string: string) => highlightMatches(filter, string);

    const resetSearchValue = () => {
        dispatch(searchbookList(''));
    };

    const handleOpenTakeReviewModal = (e: SyntheticEvent<EventTarget>) => {
        e.preventDefault();
        dispatch(
            toggleBookReviewModal({
                bookId: id,
                isOpen: true,
                userId,
            }),
        );
    };

    const handleCancelBooking = (e: SyntheticEvent<EventTarget>) => {
        e.preventDefault();
        dispatch(bookingDeleteRequest(bookingId || 0));
    };

    const handleOpenDeliveryModal = (e: SyntheticEvent, isDeliveryEdit: boolean) => {
        e.preventDefault();
        dispatch(
            toggleDeliveryModal({
                showModal: true,
                bookId: bookData?.id || '',
                isDeliveryEdit,
                dateHandedFrom: bookData?.delivery?.dateHandedFrom,
                dateHandedTo: bookData?.delivery?.dateHandedTo,
                isDelivery: true,
            }),
        );
    };

    const renderCardMain = (
        <li className={classNameCard('card')} data-test-id='card'>
            <div className={classNameCard('cardImg')}>
                <img src={image?.url ? image.url : IconPlugImg} alt={title} />
            </div>
            <div className={classNameCard('rating')}>
                {rating || rating === 0 ? (
                    <Rating rating={rating} classNameStar={styles.star} />
                ) : (
                    <span className={styles.textNoRaring}>Ещё нет оценок</span>
                )}
            </div>
            <div className={classNameCard('titleBlock')}>
                <p className={classNameCard('cardTitle')}>{handleHighlight(title)}</p>
            </div>
            <span className={classNameCard('cardAuthor')}>
                {authors && authors.length > 0 && authors.join(', ')}, {issueYear}
            </span>
            {isProfileCard ? (
                isHistory ? (
                    <div className={classNameCard('cardButton')}>
                        <Button
                            dataTestId='history-review-button'
                            view={isCommented ? 'secondary' : 'primary'}
                            onClick={handleOpenTakeReviewModal}
                        >
                            {isCommented ? 'Изменить оценку' : 'Оставить отзыв'}
                        </Button>
                    </div>
                ) : (
                    <span className={styles.backtime}>
                        Возврат {formatDate(deliveryDate?.toString() || '')}
                    </span>
                )
            ) : isBooking ? (
                <div className={classNameCard('cardButton')}>
                    <Button
                        dataTestId='cancel-booking-button'
                        view='primary'
                        onClick={handleCancelBooking}
                    >
                        Отменить бронь
                    </Button>
                </div>
            ) : (
                <div className={classNameCard('cardButton')}>
                    <BookingButton bookData={bookData} />
                </div>
            )}
        </li>
    );

    const renderCardAdminBooks = (
        <li className={classNameCard('card')} data-test-id='card'>
            <div className={classNameCard('cardImg')}>
                <img src={image?.url ? image.url : IconPlugImg} alt={title} />
            </div>
            <div className={classNameCard('titleBlock')}>
                <p className={classNameCard('cardTitle')}>{handleHighlight(title)}</p>
            </div>
            <div className={styles.cardDescription}>
                <p className={styles.cardUser}>
                    Пользователь:{' '}
                    <span>{`${booking?.customerLastName} ${booking?.customerFirstName}`}</span>
                </p>
                <p className={styles.cardDateStatus}>
                    Дата:{' '}
                    <span>{booking?.dateOrder.slice(0, 10).split('-').reverse().join('-')}</span>
                </p>
                <p className={styles.cardDateStatus}>
                    Статус: <span>{booking ? 'Забронирована' : 'Выдана'}</span>
                </p>
            </div>
            {booking ? (
                <div className={classNameCard('cardButton')}>
                    <Button
                        view='primary'
                        onClick={(e) => handleOpenDeliveryModal(e, userIdReserved === userData?.id)}
                    >
                        ВЫДАТЬ
                    </Button>
                </div>
            ) : (
                <div className={classNameCard('cardButton')}>
                    <BookingButton bookData={bookData} />
                </div>
            )}
        </li>
    );

    return (
        <Link to={linkPath} key={id} onClick={resetSearchValue}>
            {!pathname.includes('admin/books') ? renderCardMain : renderCardAdminBooks}
        </Link>
    );
};
