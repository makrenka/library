import { PASSWORD } from '../constants/password';
import { REGEXP } from '../constants/regexp';

// eslint-disable-next-line consistent-return
export const validateLogin = (fieldValue: string) => {
    if (
        !REGEXP.digit.test(fieldValue as string) ||
        !REGEXP.latinLetters.test(fieldValue as string)
    ) {
        return 'Используйте для логина латинский алфавит и цифры';
    }
};

export const validatePassword = (fieldValue: string) =>
    REGEXP.password.test(fieldValue as string) ||
    'Пароль не менее 8 символов, с заглавной буквой и цифрой';

export const validateEmail = (fieldValue: string): string | boolean =>
    REGEXP.email.test(fieldValue as string) || 'Введите корректный e-mail';

export const validateForMoreCharacters = (fieldValue: string, characters: number) =>
    fieldValue?.length >= characters;

export const validateForUppercase = (fieldValue: string) =>
    fieldValue?.split('').some((el) => REGEXP.uppercase.test(el));

export const validateForDigit = (fieldValue: string) =>
    fieldValue?.split('').some((el) => REGEXP.digit.test(el));

export const validateForLatinLetters = (fieldValue: string) =>
    fieldValue?.split('').some((el) => REGEXP.latinLetters.test(el));

export const isCorrectPassword = (password: string) => {
    let requirementCounter = 0;

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    password?.split('').some((el) => REGEXP.digit.test(el)) && (requirementCounter += 1);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    password?.split('').some((el) => REGEXP.uppercase.test(el)) && (requirementCounter += 1);

    return password?.length >= PASSWORD.minLength && requirementCounter >= 2;
};
