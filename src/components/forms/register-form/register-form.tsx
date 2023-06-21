import { Fragment, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { REGISTRATION_STATUS } from '../../../constants/auth-statuses';
import { MASKS } from '../../../constants/masks';
import { REGEXP } from '../../../constants/regexp';
import { ROUTES } from '../../../constants/routes';
import { registrationRequest, resetAuthError, resetRegistrationState } from '../../../store/auth';
import { registrationSelector } from '../../../store/auth/selectors';
import { RegistrationData } from '../../../store/auth/types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { isCorrectPassword } from '../../../utils/validations';
import { Button } from '../../button';
import { CustomInput } from '../../inputs/custom-input';
import { CustomMaskedInput } from '../../inputs/masked-input';
import { PasswordInput } from '../../inputs/password-input';
import { Loader } from '../../loader/loader';
import { StatusInfo } from '../../status-info';
import { FormFooter } from '../form-footer';
import { FormTitle } from '../form-title';

import { CustomLoginHint } from './custom-login-hint';
import { fieldsData } from './register-fields';

import styles from '../styles.module.scss';

export const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isSuccess, isLoading, errorMessage, isAlreadyUsedError } =
        useAppSelector(registrationSelector);
    const [formStep, setFormStep] = useState(1);

    const methods = useForm<RegistrationData>({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
    });

    const { errors } = methods.formState;

    const { password, username } = methods.watch();

    const handleSubmit = (data: RegistrationData) => {
        if (formStep < 3) {
            setFormStep((currentStep) => currentStep + 1);
        } else {
            dispatch(registrationRequest(data));
        }
    };

    const clearErrors = () => dispatch(resetAuthError());

    useEffect(() => {
        fieldsData[formStep].forEach(({ name }) => methods.resetField(name));
    }, [formStep, methods]);

    useEffect(() => {
        if (errorMessage || isAlreadyUsedError) {
            setFormStep(1);
        }
    }, [errorMessage, isAlreadyUsedError]);

    useEffect(
        () => () => {
            dispatch(resetAuthError());
        },
        [dispatch],
    );

    if (isSuccess) {
        return (
            <StatusInfo
                title={REGISTRATION_STATUS.success.title}
                description={REGISTRATION_STATUS.success.description}
                buttonText={REGISTRATION_STATUS.success.buttonText}
                buttonAction={() => {
                    navigate(ROUTES.auth);
                    dispatch(resetRegistrationState());
                }}
            />
        );
    }

    if (errorMessage || isAlreadyUsedError) {
        return (
            <StatusInfo
                title={REGISTRATION_STATUS.error.title}
                description={
                    isAlreadyUsedError
                        ? REGISTRATION_STATUS.error.alreadyUsedDescription
                        : REGISTRATION_STATUS.error.description
                }
                buttonText={
                    isAlreadyUsedError
                        ? REGISTRATION_STATUS.error.alreadyUsedButtonText
                        : REGISTRATION_STATUS.error.buttonText
                }
                buttonAction={() => {
                    dispatch(resetRegistrationState());
                    methods.reset();
                }}
            />
        );
    }

    return (
        <Fragment>
            <div className={styles.container}>
                <div className={styles.formHeader}>
                    <FormTitle text='Регистрация' />
                    <div className={styles.step}>{formStep} из 3</div>
                </div>
                <FormProvider {...methods}>
                    <form
                        onSubmit={methods.handleSubmit(handleSubmit)}
                        data-test-id='register-form'
                    >
                        <div className={styles.inputsWrapper}>
                            {fieldsData[formStep].map(
                                ({ name, placeholder, validation, required, hint, type }) => {
                                    if (name === 'phone') {
                                        return (
                                            <CustomMaskedInput
                                                mask={MASKS.phoneBy}
                                                key={name}
                                                type={type}
                                                name={name}
                                                placeholder={placeholder}
                                                validationPattern={{
                                                    value: REGEXP.phoneNumber,
                                                    message: hint || '',
                                                }}
                                                error={errors[name]?.message}
                                                required={required}
                                                hint={hint}
                                                inputMode='tel'
                                                clearActionErrors={clearErrors}
                                                autoComplete='off'
                                            />
                                        );
                                    }
                                    if (name === 'password') {
                                        return (
                                            <PasswordInput
                                                key={name}
                                                name={name}
                                                placeholder={placeholder}
                                                validate={validation}
                                                error={errors[name]?.message}
                                                clearActionErrors={clearErrors}
                                                autoComplete='off'
                                                isValid={isCorrectPassword(password)}
                                            />
                                        );
                                    }

                                    return (
                                        <CustomInput
                                            key={name}
                                            type={type}
                                            name={name}
                                            placeholder={placeholder}
                                            validate={validation}
                                            error={errors[name]?.message}
                                            required={required}
                                            hint={hint}
                                            clearActionErrors={clearErrors}
                                            autoComplete='off'
                                            customHint={
                                                name === 'username' && (
                                                    <CustomLoginHint value={username} />
                                                )
                                            }
                                        />
                                    );
                                },
                            )}
                        </div>
                        <Button
                            classButton={styles.button}
                            isDisabled={!!Object.keys(errors).length}
                            view='primary'
                            type='submit'
                        >
                            {formStep === 1 && 'следующий шаг'}
                            {formStep === 2 && 'последний шаг'}
                            {formStep === 3 && 'зарегистрироваться'}
                        </Button>
                    </form>
                </FormProvider>
                <FormFooter link={ROUTES.auth} text='Есть учётная запись?' linkText='Войти' />
            </div>
            {isLoading && <Loader />}
        </Fragment>
    );
};
