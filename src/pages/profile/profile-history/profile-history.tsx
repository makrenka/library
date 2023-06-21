import { useEffect, useState } from 'react';
import { FreeMode, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Card } from '../../../components/card';
import { MenuViewEnum } from '../../../constants/menu-view';
import { getBookList } from '../../../store/books/selectors';
import { BookListItem } from '../../../store/books/types';
import { useAppSelector } from '../../../store/hooks';
import { ShortBookData } from '../../../store/user/types';
import { ProfileEmpty } from '../profile-empty';

import './swiper-history.css';
import styles from './profile-history.module.scss';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

const DATA = {
    title: 'История',
    subtitle: 'Список прочитанных книг',
    data: 'Вы не читали книг из нашей библиотеки',
};

type ProfileHistoryProps = {
    history: ShortBookData[] | null;
    userId?: number;
    commentsUserBooksId?: number[];
};

export const ProfileHistory = ({ history, userId, commentsUserBooksId }: ProfileHistoryProps) => {
    const books = useAppSelector(getBookList);
    const [findHistory, setFindHistory] = useState<BookListItem[]>();

    // TODO Когда у "коротких" книг появятся картинки - переделать на прямую передачу + можно брать id книги из комментариев пользователя при добавлении комментария

    useEffect(() => {
        if (books && !!history?.length) {
            setFindHistory(
                history.map(({ id: itemid }) =>
                    books?.find(({ id }) => itemid === id),
                ) as BookListItem[],
            );
        }
    }, [books, history]);

    return (
        <div className={styles.functionsItem} data-test-id='history'>
            <span className={styles.title}>{DATA.title}</span>
            <span className={styles.subtitle}>{DATA.subtitle}</span>

            {history?.length ? (
                <Swiper
                    className='history'
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    modules={[FreeMode, Pagination]}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        880: {
                            slidesPerView: 4,
                        },
                        572: {
                            slidesPerView: 3,
                        },
                        421: {
                            slidesPerView: 2,
                        },
                    }}
                >
                    {findHistory?.map((book) => (
                        <SwiperSlide
                            key={book?.id}
                            className='history'
                            data-test-id='history-slide'
                        >
                            <Card
                                data={book}
                                menuView={MenuViewEnum.window}
                                isProfileCard={!!history}
                                isHistory={true}
                                userId={userId}
                                isCommented={commentsUserBooksId?.includes(book.id)}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <ProfileEmpty data={DATA.data} />
            )}
        </div>
    );
};
