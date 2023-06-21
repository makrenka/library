import { useEffect } from 'react';
import classNames from 'classnames';

import { useAppDispatch } from '../../store/hooks';
import { deleteToast } from '../../store/view';
import { ToastType } from '../../store/view/types';

import { ReactComponent as Icon } from './assets/alert_icon.svg';

import styles from './toast.module.scss';

export const Toast = ({ text, type }: ToastType) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const timeout: ReturnType<typeof setTimeout> = setTimeout(
            () => dispatch(deleteToast(text)),
            4000,
        );

        return () => clearTimeout(timeout);
    }, [dispatch, text]);

    return (
        <div className={classNames(styles.wrapper, styles[type])} data-test-id='error'>
            <Icon className={classNames(styles.icon, styles[type])} />
            <p className={styles.text}>{text}</p>
            <button
                type='button'
                onClick={() => dispatch(deleteToast(text))}
                data-test-id='alert-close'
            >
                закрыть
            </button>
        </div>
    );
};
