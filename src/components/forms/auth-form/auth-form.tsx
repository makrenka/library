import { Fragment, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { AUTH_STATUS } from '../../../constants/auth-statuses';
import { ROUTES } from '../../../constants/routes';
import { authRequest, resetAuthError } from '../../../store/auth';
import { authenticationSelector, authSelector } from '../../../store/auth/selectors';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Button } from '../../button';
import { Hint } from '../../hint';
import { CustomInput } from '../../inputs/custom-input';
import { PasswordInput } from '../../inputs/password-input';
import { Loader } from '../../loader/loader';
import { StatusInfo } from '../../status-info';
import { FormFooter } from '../form-footer';
import { FormTitle } from '../form-title';

import styles from '../styles.module.scss';

type AuthFormInputs = {
    identifier: string;
    password: string;
};

export const AuthForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { errorMessage, isError, isLoading } = useAppSelector(authenticationSelector);
    const { isAuthenticated } = useAppSelector(authSelector);

    const methods = useForm<AuthFormInputs>({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
    });

    const { errors } = methods.formState;

    const handleSubmit = (data: AuthFormInputs) => {
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
        if (isAuthenticated) {
            navigate(ROUTES.main, { replace: true });
        }
    }, [isAuthenticated, navigate]);

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
            <div className={styles.container}>
                <FormTitle text='Вход в личный кабинет' />
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(handleSubmit)} data-test-id='auth-form'>
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
                        <div className={styles.hint}>
                            <Hint view={errorMessage ? 'error' : 'ghost'}>
                                {errorMessage || (
                                    <Link to={ROUTES.recovery}>Забыли логин или пароль?</Link>
                                )}
                            </Hint>
                            {errorMessage && (
                                <Hint view='dark'>
                                    <Link to={ROUTES.recovery}>Восстановить?</Link>
                                </Hint>
                            )}
                        </div>
                        <Button classButton={styles.button} view='primary' type='submit'>
                            Вход
                        </Button>
                    </form>
                </FormProvider>
                <FormFooter
                    link={ROUTES.registration}
                    text='Нет учётной записи?'
                    linkText='Регистрация'
                />
            </div>
            {isLoading && <Loader />}
        </Fragment>
    );
};
