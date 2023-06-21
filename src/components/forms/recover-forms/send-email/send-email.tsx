import { Fragment, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { ROUTES } from '../../../../constants/routes';
import { forgotPasswordRequest, resetAuthError } from '../../../../store/auth';
import { forgotSelector } from '../../../../store/auth/selectors';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { validateEmail } from '../../../../utils/validations';
import { Button } from '../../../button';
import { Hint } from '../../../hint';
import { CustomInput } from '../../../inputs/custom-input';
import { Loader } from '../../../loader/loader';
import { FormFooter } from '../../form-footer';

import styles from '../../styles.module.scss';

type RecoveryFormInput = {
    email: string;
};

export const SendEmail = () => {
    const dispatch = useAppDispatch();
    const { errorMessage, isLoading } = useAppSelector(forgotSelector);

    const methods = useForm<RecoveryFormInput>({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
    });

    const { errors } = methods.formState;

    const handleSubmit = (data: RecoveryFormInput) => {
        dispatch(forgotPasswordRequest(data));
    };

    useEffect(
        () => () => {
            dispatch(resetAuthError());
        },
        [dispatch],
    );

    return (
        <Fragment>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleSubmit)} data-test-id='send-email-form'>
                    <div className={styles.inputsWrapper}>
                        <CustomInput
                            type='email'
                            name='email'
                            placeholder='Email'
                            required={true}
                            validate={validateEmail}
                            error={errorMessage || errors.email?.message}
                        />
                    </div>
                    <Hint view='ghost'>
                        На это email будет отправлено письмо с инструкциями по восстановлению пароля
                    </Hint>
                    <Button classButton={styles.button} view='primary' type='submit'>
                        Восстановить
                    </Button>
                </form>
            </FormProvider>
            <FormFooter
                link={ROUTES.registration}
                text='Нет учётной записи?'
                linkText='Регистрация'
            />
            {isLoading && <Loader />}
        </Fragment>
    );
};
