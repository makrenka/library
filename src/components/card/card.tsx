import { SyntheticEvent } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { MenuViewEnum } from '../../constants/menu-view';
import { NAV_MENU_ALL, NAV_MENU_MAIN } from '../../constants/nav-menu-list';
import {
    bookingDeleteRequest,
    deliveryDeleteRequest,
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
import { BOOKING, DELIVERY } from '../../constants/books';

import IconPlugImg from './assets/icon-plug-img.svg';

import styles from './card.module.scss';
import { ROUTES } from '../../constants/routes';

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
        data: { rating, title, authors, id, issueYear, image, booking, delivery },
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
                bookIdDelivery: bookData?.id || '',
                deliveryId: bookData?.delivery?.id || null,
                isDeliveryEdit,
                dateHandedFrom: bookData?.delivery?.dateHandedFrom,
                dateHandedTo: bookData?.delivery?.dateHandedTo,
                isDelivery: true,
                userId: booking?.customerId || delivery?.recipientId || null,
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
                    !pathname.includes('admin/users') ? (
                        <div className={classNameCard('cardButton')}>
                            <Button
                                dataTestId='history-review-button'
                                view={isCommented ? 'secondary' : 'primary'}
                                onClick={handleOpenTakeReviewModal}
                            >
                                {isCommented ? 'Изменить оценку' : 'Оставить отзыв'}
                            </Button>
                        </div>
                    ) : null
                ) : (
                    <span className={styles.backtime}>
                        Возврат {formatDate(deliveryDate?.toString() || '')}
                    </span>
                )
            ) : isBooking ? (
                <div className={classNameCard('cardButton')}>
                    {!pathname.includes('admin/users') ? (
                        <Button
                            dataTestId='cancel-booking-button'
                            view='primary'
                            onClick={handleCancelBooking}
                        >
                            Отменить бронь
                        </Button>
                    ) : (
                        ''
                    )}
                </div>
            ) : (
                <div className={classNameCard('cardButton')}>
                    <BookingButton bookData={bookData} />
                </div>
            )}
        </li>
    );

    const renderCardAdminBooks = (
        <li className={classNameCard('cardAdmin')} data-test-id='card'>
            <Link to={linkPath} onClick={resetSearchValue} className={styles.cardImgLink}>
                <div className={classNameCard('cardImg')}>
                    <img src={image?.url ? image.url : IconPlugImg} alt={title} />
                </div>
            </Link>
            <Link to={linkPath} onClick={resetSearchValue} className={styles.cardTitleLink}>
                <div className={classNameCard('titleBlock')}>
                    <p className={classNameCard('cardTitle')}>{handleHighlight(title)}</p>
                </div>
            </Link>
            <div className={styles.cardDescription}>
                <p className={styles.cardUser}>
                    Пользователь:{' '}
                    <Link
                        to={`${ROUTES.adminUsers}/${booking?.customerId || delivery?.recipientId}`}
                    >
                        <span>
                            {booking
                                ? `${booking?.customerLastName} ${booking?.customerFirstName}`
                                : `${delivery?.recipientLastName} ${delivery?.recipientFirstName}`}
                        </span>
                    </Link>
                </p>
                <p className={styles.cardDateStatus}>
                    {booking ? 'Дата: ' : 'Срок: '}
                    <span>
                        {booking
                            ? booking?.dateOrder.slice(0, 10).split('-').reverse().join('.')
                            : `${delivery?.dateHandedFrom
                                .slice(0, 10)
                                .split('-')
                                .reverse()
                                .join('.')}-${delivery?.dateHandedTo
                                    .slice(0, 10)
                                    .split('-')
                                    .reverse()
                                    .join('.')}`}
                    </span>
                </p>
                <p className={styles.cardDateStatus}>
                    Статус: <span>{booking ? BOOKING.status : DELIVERY.status}</span>
                </p>
            </div>
            <div className={classNameCard('cardButtonAdmin')}>
                {booking ? (
                    <>
                        <div className={styles.notVisible}> </div>
                        <Button
                            view='primary'
                            onClick={(e) =>
                                handleOpenDeliveryModal(e, userIdReserved === userData?.id)
                            }
                        >
                            {booking ? DELIVERY.buttonCreate : DELIVERY.buttonUpdate}
                        </Button>
                    </>
                ) : (
                    <>
                        <div className={styles.deliveryReturnBtn}>
                            <Button
                                view='secondary'
                                onClick={() => dispatch(deliveryDeleteRequest(delivery.id))}
                            >
                                {DELIVERY.buttonReturn}
                            </Button>
                        </div>
                        <div className={styles.deliveryUpdateBtn}>
                            <Button
                                view='primary'
                                onClick={(e) =>
                                    handleOpenDeliveryModal(e, userIdReserved === userData?.id)
                                }
                            >
                                {booking ? DELIVERY.buttonCreate : DELIVERY.buttonUpdate}
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </li>
    );

    return !pathname.includes('admin/books') ? (
        <Link to={linkPath} key={id} onClick={resetSearchValue}>
            {renderCardMain}
        </Link>
    ) : (
        renderCardAdminBooks
    );
};
