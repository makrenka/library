import { describe, expect, jest, test } from '@jest/globals';

import { createMonth } from '../create-month';
import { createDate } from '../create-date';
import { getMonthNumberOfDays } from '../get-month-number-of-days';

describe('create month', () => {
    test('get month params', () => {
        const date = new Date('2023-02-01');
        const params = {
            locale: 'default',
            date: date,
        };

        const getDay = (dayNumber = 1) =>
            createDate({ date: new Date(2023, 1, dayNumber), locale: 'default' });

        const createMonthDays = () => {
            const days = [];

            for (let i = 0; i <= getMonthNumberOfDays(1, 2023) - 1; i += 1) {
                days[i] = getDay(i + 1);
            }

            return days;
        };

        expect(createMonth(params)).toEqual({
            getDay,
            monthName: 'февраль',
            monthIndex: 1,
            monthNumber: 2,
            year: 2023,
            createMonthDays,
        });
    });
});
