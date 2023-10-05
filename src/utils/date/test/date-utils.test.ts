import { describe, expect, test } from '@jest/globals';
import { formatDate } from '../date-utils';

describe('format date', () => {
    test('getting day and month of the date', () => {
        const date = (day: string) => new Date(day).toISOString();

        expect(formatDate(date('2023-02-01'))).toBe('01.02');
        expect(formatDate(date('2023-03-25'))).toBe('25.03');
        expect(formatDate(date('2023-10-05'))).toBe('05.10');
    });
});
