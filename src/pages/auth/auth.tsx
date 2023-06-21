import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { ROUTES } from '../../constants/routes';
import { authSelector } from '../../store/auth/selectors';
import { useAppSelector } from '../../store/hooks';

import styles from './auth.module.scss';

export const Auth = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAppSelector(authSelector);

    useEffect(() => {
        const token = Cookies.get('token');
        const user = localStorage.getItem('user');

        if (token && user && isAuthenticated) {
            navigate(ROUTES.main, { replace: true });
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className={styles.container} data-test-id='auth'>
            <div className={styles.content}>
                <h1 className={styles.title}>Cleverland</h1>
                <div className={styles.childrenContainer}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
