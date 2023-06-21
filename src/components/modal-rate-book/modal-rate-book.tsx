import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { authenticationSelector } from '../../store/auth/selectors';
import {
    bookRequest,
    bookReviewRequest,
    bookReviewUpdateRequest,
    toggleBookReviewModal,
} from '../../store/books';
import { bookReviewSelector, getBookData } from '../../store/books/selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Comment } from '../../store/user/types';
import { Button } from '../button';
import { Modal } from '../modal';
import { Rating } from '../rating';

import styles from './modal-rate-book.module.scss';

export type DefaultValuesType = {
    rating: number;
    text: string;
    book: string | number;
    user: string | number | null;
};

export type UpdateCommentPayloadType = {
    rating: number;
    text: string;
    book: string | number;
    user: string | number | null;
    commentId: string | number;
};

export const ModalRateBook = () => {
    const dispatch = useAppDispatch();
    const book = useAppSelector(getBookData);

    const { userData } = useAppSelector(authenticationSelector);
    const { isLoading, bookId, isSuccess, isError, userId } = useAppSelector(bookReviewSelector);
    // TODO если забуду сделать красиво
    let commentUser: Comment | undefined;

    if (book?.comments) {
        commentUser = book?.comments.find(({ user }) => user.commentUserId === userId);
    }

    const { register, handleSubmit, setValue, reset, watch } = useForm({
        defaultValues: {
            rating: 1,
            text: '',
            book: '',
            user: null,
        } as DefaultValuesType,
        mode: 'onChange',
    });

    const onSubmit = (formData: DefaultValuesType) => {
        if (commentUser) {
            const { rating, text, book: formBook, user } = formData;
            const payload: UpdateCommentPayloadType = {
                rating,
                text,
                book: formBook,
                user,
                commentId: commentUser.id,
            };

            dispatch(bookReviewUpdateRequest(payload));
        } else {
            dispatch(bookReviewRequest(formData));
        }
    };

    useEffect(() => {
        if (bookId && book?.id !== bookId) {
            dispatch(bookRequest(bookId));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [book?.id !== bookId]);

    useEffect(() => {
        if (isSuccess || isError) {
            reset();
        }
        setValue('book', bookId as string);
        setValue('user', userData?.id as number);

        return () => reset();
    }, [bookId, isError, isSuccess, reset, setValue, userData]);

    useEffect(() => {
        setValue('text', commentUser?.text as string);
        setValue('rating', commentUser?.rating as number);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [book]);

    return (
        <Modal
            dataTestId='modal-rate-book'
            onClose={() => dispatch(toggleBookReviewModal({ bookId: null, isOpen: false }))}
            title='Оцените книгу'
        >
            <form className={styles.content} onSubmit={handleSubmit(onSubmit)}>
                <p className={styles.subtitle}>Ваша оценка</p>
                <Rating
                    classNameStar={styles.star}
                    rating={watch('rating')}
                    isEditable={true}
                    setValue={setValue}
                />
                <textarea data-test-id='comment' placeholder='Комментарий' {...register('text')} />
                <Button
                    classButton={styles.button}
                    view='primary'
                    type='submit'
                    isDisabled={isLoading}
                    dataTestId='button-comment'
                >
                    ОЦЕНИТЬ
                </Button>
            </form>
        </Modal>
    );
};
