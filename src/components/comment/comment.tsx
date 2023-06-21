import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { Rating } from '../rating';

import avatarImg from './assets/avatar.jpg';

import styles from './comment.module.scss';

type CommentProps = {
    avatar?: string;
    name: string;
    date: string;
    rating: number;
    text?: string;
};

export const Comment = ({ avatar = avatarImg, name, date, rating, text }: CommentProps) => {
    const dateFormatted = format(new Date(date), 'dd MMMM yyyy', { locale: ru });

    return (
        <div className={styles.comment} data-test-id='comment-wrapper'>
            <div className={styles.commentBlock}>
                <img src={avatar ? avatar : avatarImg} alt='Аватар' className={styles.avatar} />
                <span className={styles.name} data-test-id='comment-author'>
                    {name}
                </span>
                <span className={styles.date} data-test-id='comment-date'>
                    {dateFormatted}
                </span>
            </div>
            <div className={styles.commentRating}>
                <Rating rating={rating} />
            </div>
            <span className={styles.commentText} data-test-id='comment-text'>
                {text}
            </span>
        </div>
    );
};
