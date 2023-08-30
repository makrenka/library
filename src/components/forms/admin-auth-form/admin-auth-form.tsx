import { Fragment, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { AUTH_STATUS } from '../../../constants/auth-statuses';
import { ROUTES } from '../../../constants/routes';
import { authRequest, resetAuthError, setAuthenticated } from '../../../store/auth';
import { authenticationSelector } from '../../../store/auth/selectors';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Button } from '../../button';
import { CustomInput } from '../../inputs/custom-input';
import { PasswordInput } from '../../inputs/password-input';
import { Loader } from '../../loader/loader';
import { StatusInfo } from '../../status-info';
import { FormTitle } from '../form-title';
import { getUserSelector } from '../../../store/user/selectors';
import { authenticatedUserRequest } from '../../../store/user';

import styles from './admin-auth-form.module.scss';

type AuthFormInputs = {
    identifier: string;
    password: string;
};

export const AdminAuthForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { errorMessage, isError, isLoading } = useAppSelector(authenticationSelector);
    const { data } = useAppSelector(getUserSelector);

    const methods = useForm<AuthFormInputs>({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
    });

    const { errors } = methods.formState;

    const handleSubmit = (data: AuthFormInputs) => {
        dispatch(setAuthenticated(false));
        dispatch(authRequest(data));
    };

    const clearErrors = () => dispatch(resetAuthError());

    useEffect(
        () => () => {
            dispatch(resetAuthError());
        },
        [dispatch],
    );

    useEffect(() => {
        dispatch(authenticatedUserRequest());
        if (data.role?.type === 'admin') {
            navigate(ROUTES.adminBooks, { replace: true });
        }
    }, [data, navigate, dispatch]);

    if (isError) {
        return (
            <StatusInfo
                title={AUTH_STATUS.error.title}
                description={AUTH_STATUS.error.description}
                buttonText={AUTH_STATUS.error.buttonText}
                buttonAction={() => {
                    dispatch(resetAuthError());
                    methods.reset();
                }}
            />
        );
    }

    return (
        <Fragment>
            <div className={styles.adminFormWrapper}>
                <div className={styles.adminContainer}>
                    <FormTitle text='Вход в кабинет администратора' />
                    <FormProvider {...methods}>
                        <form
                            onSubmit={methods.handleSubmit(handleSubmit)}
                            data-test-id='auth-form'
                        >
                            <div className={styles.inputsWrapper}>
                                <CustomInput
                                    name='identifier'
                                    placeholder='Логин'
                                    clearActionErrors={clearErrors}
                                    required={true}
                                    error={errors.identifier?.message || !!errorMessage}
                                />
                                <PasswordInput
                                    name='password'
                                    type='password'
                                    placeholder='Пароль'
                                    clearActionErrors={clearErrors}
                                    required={true}
                                    hint=''
                                    error={errors.password?.message || !!errorMessage}
                                />
                            </div>
                            <Button classButton={styles.button} view='primary' type='submit'>
                                Вход
                            </Button>
                        </form>
                    </FormProvider>
                </div>
            </div>
            {isLoading && <Loader />}
        </Fragment>
    );
};
