import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { ROUTES } from '../constants/routes';
import { authSuccess, setAuthenticated } from '../store/auth';
import { authenticationSelector, authSelector } from '../store/auth/selectors';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getUserSelector } from '../store/user/selectors';

export const AdminProtectedRoute = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { userData } = useAppSelector(authenticationSelector);
    const { data } = useAppSelector(getUserSelector);

    useEffect(() => {
        const token = Cookies.get('token');
        const user = localStorage.getItem('user');

        if (!token || !user) {
            Cookies.remove('token');
            localStorage.removeItem('user');
            dispatch(setAuthenticated(false));
            navigate(ROUTES.auth, { replace: true });
        }
        if (token && user && !userData) {
            dispatch(authSuccess(JSON.parse(user)));
        }
    }, [navigate, dispatch, userData]);

    if (data.role.type !== 'admin') {
        navigate(ROUTES.admin, { replace: true });
    }

    return <Outlet />;
};
