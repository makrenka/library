import { Fragment } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { createPasswordRequest, resetAuthError } from '../../../../store/auth';
import { createPasswordSelector } from '../../../../store/auth/selectors';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { isCorrectPassword, validatePassword } from '../../../../utils/validations';
import { Button } from '../../../button';
import { Hint } from '../../../hint';
import { PasswordInput } from '../../../inputs/password-input';
import { Loader } from '../../../loader/loader';
import { FormFooter } from '../../form-footer';

import styles from '../../styles.module.scss';

type ResetPasswordFormInput = {
    password: string;
    passwordConfirmation: string;
};

export const ResetPassword = ({ code }: { code: string }) => {
    const dispatch = useAppDispatch();
    const { errorMessage, isLoading } = useAppSelector(createPasswordSelector);

    const methods = useForm<ResetPasswordFormInput>({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
    });

    const { errors } = methods.formState;

    const { password } = methods.watch();

    const handleSubmit = (data: ResetPasswordFormInput) => {
        dispatch(createPasswordRequest({ code, ...data }));
    };

    const clearErrors = () => dispatch(resetAuthError());

    const checkConfirmPassword = (value: string) =>
        (!!password && !!value && password === value) || 'Пароли не совпадают';

    return (
        <Fragment>
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(handleSubmit)}
                    data-test-id='reset-password-form'
                >
                    <div className={styles.inputsWrapper}>
                        <PasswordInput
                            name='password'
                            placeholder='Новый пароль'
                            validate={validatePassword}
                            error={errors.password?.message}
                            clearActionErrors={clearErrors}
                            isValid={isCorrectPassword(password)}
                        />
                        <PasswordInput
                            name='passwordConfirmation'
                            placeholder='Повторите пароль'
                            validate={checkConfirmPassword}
                            error={errors.passwordConfirmation?.message}
                            clearActionErrors={clearErrors}
                            hint=''
                        />
                    </div>
                    {errorMessage && (
                        <Hint className={styles.hint} view='error'>
                            {errorMessage}
                        </Hint>
                    )}
                    <Button
                        classButton={styles.button}
                        view='primary'
                        type='submit'
                        isDisabled={!!Object.keys(errors).length}
                    >
                        сохранить изменения
                    </Button>
                </form>
            </FormProvider>
            <FormFooter text='После сохранения войдите в библиотеку, используя новый пароль' />
            {isLoading && <Loader />}
        </Fragment>
    );
};
