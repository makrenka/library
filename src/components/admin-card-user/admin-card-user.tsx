import { useAppSelector } from '../../store/hooks';
import { searchSelector } from '../../store/search/selectors';
import { highlightMatches } from '../../utils/highlight-matches';

import styles from './admin-card-user.module.scss';

export const AdminCardUser = () => {
    const { filter } = useAppSelector(searchSelector);
    const handleHighlight = (string: string) => highlightMatches(filter, string);

    return (
        <li className={styles.card}>
            {/* <div className={styles.cardImg}>
                <img src={image?.url ? image.url : IconPlugImg} alt={title} />
            </div>
            <div className={styles.titleBlock}>
                <p className={styles.cardTitle}>{handleHighlight(title)}</p>
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
                <div className={styles.cardButton}>
                    <Button
                        view='primary'
                        onClick={(e) => handleOpenDeliveryModal(e, userIdReserved === userData?.id)}
                    >
                        ВЫДАТЬ
                    </Button>
                </div>
            ) : (
                <div className={styles.cardButton}>
                    <BookingButton bookData={bookData} />
                </div>
            )} */}
        </li>
    );
};
