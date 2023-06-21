import { ChangeEventHandler, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

import { PASSWORD } from '../../../constants/password';
import {
    validateForDigit,
    validateForMoreCharacters,
    validateForUppercase,
} from '../../../utils/validations';
import { Hint } from '../../hint';
import { ReactComponent as Check } from '../assets/check.svg';
import { ReactComponent as Eye } from '../assets/eye.svg';
import { ReactComponent as EyeClosed } from '../assets/eye-closed.svg';
import { CustomInputProps } from '../types';

import styles from '../styles.module.scss';

type PaswordInputProps = CustomInputProps & {
    minLength?: number;
    isValid?: boolean;
    dataTestId?: string;
};

const inputPasswordStateValues = {
    type: 'password',
    img: <EyeClosed data-test-id='eye-closed' />,
};
const inputTextStateValues = {
    type: 'text',
    img: <Eye data-test-id='eye-opened' />,
};

const HINT = 'Пароль не менее 8 символов, с заглавной буквой и цифрой';

export const PasswordInput = ({
    name,
    placeholder,
    error,
    clearActionErrors,
    required = true,
    hint = HINT,
    className,
    validate,
    minLength = PASSWORD.minLength,
    autoComplete,
    isValid,
    isDisabled,
    dataTestId,
}: PaswordInputProps) => {
    const [inputTypePassword, toggleInputTypePassword] = useState(inputPasswordStateValues);
    const [showPassword, setShowPassword] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const inputClassName = classNames(
        styles.input,
        className,
        error && styles.error,
        !showPassword && styles.password,
    );
    const {
        register,
        watch,
        trigger,
        setValue,
        clearErrors,
        formState: { errors },
    } = useFormContext();
    const watchedFieldValue = watch(name || '');

    const handleFocus = () => setIsFilled(true);

    const handleBlur = () => {
        trigger(name);
        setIsFilled(Boolean(watchedFieldValue));
    };

    const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
        setValue(name || '', value);

        if (watchedFieldValue !== value) {
            clearErrors(name);
            clearActionErrors?.();
        }
    };

    const handleInputType = () => {
        if (showPassword) toggleInputTypePassword(inputPasswordStateValues);
        else toggleInputTypePassword(inputTextStateValues);

        setShowPassword((prevState) => !prevState);
    };

    return (
        <div className={styles.formControlInner}>
            <div className={styles.inputWrapper}>
                <span className={classNames(styles.placeholder, isFilled && styles.filled)}>
                    {placeholder}
                </span>
                <input
                    data-test-id={dataTestId}
                    type='text'
                    className={inputClassName}
                    {...register(name || '', {
                        required: required && 'Поле не может быть пустым',
                        validate,
                    })}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    autoComplete={autoComplete}
                    disabled={isDisabled}
                />
                <span className={styles.iconsWrapper}>
                    {isValid && <Check data-test-id='checkmark' />}
                    {watchedFieldValue && (
                        <button
                            type='button'
                            onClick={handleInputType}
                            className={styles.eyeButton}
                        >
                            {inputTypePassword.img}
                        </button>
                    )}
                </span>
            </div>
            {hint && validate && watchedFieldValue && !errors[name as string]?.message ? (
                <Hint view='ghost' className={styles.hint}>
                    Пароль{' '}
                    <span
                        className={classNames(
                            !validateForMoreCharacters(watchedFieldValue, minLength) &&
                                styles.errorHint,
                        )}
                    >
                        {`не менее ${minLength} символов`}
                    </span>
                    , с{' '}
                    <span
                        className={classNames(
                            !validateForUppercase(watchedFieldValue) && styles.errorHint,
                        )}
                    >
                        заглавной буквой
                    </span>{' '}
                    и{' '}
                    <span
                        className={classNames(
                            !validateForDigit(watchedFieldValue) && styles.errorHint,
                        )}
                    >
                        цифрой
                    </span>
                </Hint>
            ) : (
                <Hint view={error ? 'error' : 'ghost'} className={styles.hint}>
                    {error || hint}
                </Hint>
            )}
        </div>
    );
};
