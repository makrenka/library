import { describe, expect, it } from '@jest/globals';
import {
    isCorrectPassword,
    validateEmail,
    validateForDigit,
    validateForLatinLetters,
    validateForMoreCharacters,
    validateForUppercase,
    validateLogin,
    validatePassword,
} from '../validations';

describe('validation', () => {
    it('validates login', () => {
        expect(validateLogin('сяржук')).toBe('Используйте для логина латинский алфавит и цифры');
        expect(validateLogin('сяржук100')).toBe('Используйте для логина латинский алфавит и цифры');
        expect(validateLogin('siarzhuk100')).toBeUndefined();
    });

    it('validates password', () => {
        expect(validatePassword('сяржук')).toBe(
            'Пароль не менее 8 символов, с заглавной буквой и цифрой',
        );
    });

    it('validates email', () => {
        expect(validateEmail('сяржук.com')).toBe('Введите корректный e-mail');
    });

    it('validates min length of the password', () => {
        expect(validateForMoreCharacters('сяржук', 8)).toBeFalsy();
    });

    it('validates letters in uppercase', () => {
        expect(validateForUppercase('Cяржук')).toBeTruthy();
    });

    it('validates digits', () => {
        expect(validateForDigit('Cяржук100')).toBeTruthy();
    });

    it('validates latin letters', () => {
        expect(validateForLatinLetters('sяржук100')).toBeFalsy();
    });

    it('validates correct password', () => {
        expect(isCorrectPassword('Cяржук100')).toBeTruthy();
    });
});
