import { describe, expect, test } from '@jest/globals';
import { getMonthNumberOfDays } from '../get-month-number-of-days';

describe('get number of days', () => {
    test('number of days from the date', () => {
        const monthIndex = (day: string) => new Date(day).getMonth();
        expect(getMonthNumberOfDays(monthIndex('2023-01-01'))).toBe(31);
        expect(getMonthNumberOfDays(monthIndex('2023-02-01'))).toBe(28);
        expect(getMonthNumberOfDays(monthIndex('2023-11-01'))).toBe(30);
    });
});
