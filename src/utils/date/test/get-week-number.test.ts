import { describe, expect, test } from '@jest/globals';
import { getWeekNumber } from '../get-week-number';

describe('get week number', () => {
    test('week number of the date', () => {
        const date = (day: string) => new Date(day);
        expect(getWeekNumber(date('2023-01-01'))).toBe(1);
        expect(getWeekNumber(date('2023-02-01'))).toBe(5);
        expect(getWeekNumber(date('2023-10-01'))).toBe(40);
    });
});
