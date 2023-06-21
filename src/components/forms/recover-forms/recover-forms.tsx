import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { CREATE_PASSWORD_STATUS, SEND_EMAIL_STATUS } from '../../../constants/auth-statuses';
import { ROUTES } from '../../../constants/routes';
import {
    resetAuthError,
    resetCreatePasswordState,
    resetForgotPasswordState,
} from '../../../store/auth';
import { createPasswordSelector, forgotSelector } from '../../../store/auth/selectors';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Link } from '../../link';
import { StatusInfo } from '../../status-info';
import { FormTitle } from '../form-title';

import { ResetPassword } from './reset-password';
import { SendEmail } from './send-email';

import styles from '../styles.module.scss';

export const RecoverForms = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { isSuccess: isForgotSuccess } = useAppSelector(forgotSelector);
    const { isSuccess: isCreatePasswordSuccess, errorMessage: isCreatePasswordError } =
        useAppSelector(createPasswordSelector);

    const code = searchParams.get('code');

    useEffect(
        () => () => {
            dispatch(resetForgotPasswordState());
            dispatch(resetCreatePasswordState());
            dispatch(resetAuthError());
        },
        [dispatch],
    );
    if (isForgotSuccess) {
        return (
            <StatusInfo
                title={SEND_EMAIL_STATUS.success.title}
                description={SEND_EMAIL_STATUS.success.description}
            />
        );
    }

    if (isCreatePasswordSuccess) {
        return (
            <StatusInfo
                title={CREATE_PASSWORD_STATUS.success.title}
                description={CREATE_PASSWORD_STATUS.success.description}
                buttonText={CREATE_PASSWORD_STATUS.success.buttonText}
                buttonAction={() => {
                    dispatch(resetCreatePasswordState());
                    navigate(ROUTES.auth);
                }}
            />
        );
    }

    if (isCreatePasswordError) {
        return (
            <StatusInfo
                title={CREATE_PASSWORD_STATUS.error.title}
                description={CREATE_PASSWORD_STATUS.error.description}
                buttonText={CREATE_PASSWORD_STATUS.error.buttonText}
                buttonAction={() => {
                    dispatch(resetCreatePasswordState());
                }}
            />
        );
    }

    return (
        <div className={styles.container}>
            {!code && (
                <div className={styles.header}>
                    <Link
                        href={ROUTES.auth}
                        text='вход в личный кабинет'
                        arrowSide='left'
                        view='light'
                    />
                </div>
            )}
            <FormTitle text='Восстановление' />
            {code && <ResetPassword code={code} />}
            {!code && <SendEmail />}
        </div>
    );
};
