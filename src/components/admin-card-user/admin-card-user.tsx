import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { SyntheticEvent } from 'react';

import { blockUserRequest, unblockUserRequest } from '../../store/user';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { searchSelector } from '../../store/search/selectors';
import { ResponseUsersList } from '../../store/user/types';
import { highlightMatches } from '../../utils/highlight-matches';
import { Button } from '../button';
import { BUTTON_TEXT } from '../../constants/button';
import { ROUTES } from '../../constants/routes';

import IconPlugImg from './assets/icon-plug-img.svg';
import IconBook from './assets/icon-book.svg';
import IconCalendar from './assets/icon-calendar.svg';
import IconWarning from './assets/icon-warning.svg';

import styles from './admin-card-user.module.scss';

type CardUserType = {
    dataUsers: ResponseUsersList;
};

export const AdminCardUser = ({
    dataUsers: {
        id,
        avatar,
        lastName,
        firstName,
        username,
        delivery: { handed, dateHandedTo },
        createdAt,
        phone,
        blocked,
    },
}: CardUserType) => {
    const { filter } = useAppSelector(searchSelector);
    const dispatch = useAppDispatch();

    const handleHighlight = (string: string) => highlightMatches(filter, string);
    const lateBookReturn =
        new Date() > new Date(Date.parse(dateHandedTo !== null ? dateHandedTo : ''));

    const blockUser = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(blockUserRequest(id));
    };

    const unblockUser = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(unblockUserRequest(id));
    };

    return (
        <Link to={`${ROUTES.adminUsers}/${id}`}>
            <li className={classNames(styles.card, blocked && styles.cardBlocked)} key={id}>
                <div className={styles.cardImg}>
                    <img src={avatar ? avatar : IconPlugImg} alt={username} />
                </div>
                <div className={styles.userNameBlock}>
                    <p className={styles.cardUserName}>{handleHighlight(`${lastName} ${firstName}`)}</p>
                </div>
                <div className={styles.cardDescription}>
                    <p className={styles.cardDescriptionText}>
                        Логин: <span>{username}</span>
                    </p>
                </div>
                <div className={styles.cardDescriptionCounterWrapper}>
                    <div className={styles.cardDescriptionCounter}>
                        <img src={IconBook} alt='icon book' className={styles.counterImg} />
                        <p className={styles.counterText}>
                            <span>{handed == null ? '0' : '1'}</span> книг
                            <span>{handed == null ? '' : 'а'}</span>
                        </p>
                    </div>
                    <p className={styles.cardDescriptionText}>
                        Дата регистрации:{' '}
                        <span>{createdAt.slice(0, 10).split('-').reverse().join('-')}</span>
                    </p>
                    <p className={styles.cardDescriptionText}>
                        Номер телефона: <span>{handleHighlight(`${phone.slice(0, 19)}`)}</span>
                    </p>
                </div>
                {blocked ? (
                    <div className={styles.cardButton}>
                        <Button view='primary' onClick={unblockUser}>
                            {BUTTON_TEXT.UNBLOCK}
                        </Button>
                    </div>
                ) : (
                    <div className={styles.cardButton}>
                        <Button view='secondary' onClick={blockUser}>
                            {BUTTON_TEXT.BLOCK}
                        </Button>
                    </div>
                )}
                <div
                    className={classNames(
                        styles.returnSign,
                        dateHandedTo && lateBookReturn && styles.returnSignRed,
                        dateHandedTo && !lateBookReturn && styles.returnSignGreen,
                    )}
                >
                    <img
                        src={lateBookReturn ? IconWarning : IconCalendar}
                        alt='icon return sign'
                        className={styles.returnSignImg}
                    />
                    <p className={styles.dateHandedTo}>
                        {dateHandedTo &&
                            (dateHandedTo as string)
                                .slice(0, 10)
                                .split('-')
                                .reverse()
                                .join('.')
                                .slice(0, 5)}
                    </p>
                </div>
            </li>
        </Link>
    );
};
