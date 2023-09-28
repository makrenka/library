import { describe, expect, jest, test } from '@jest/globals';
import { set, reset } from 'mockdate';

import { createMonth } from '../create-month';
import { createDate } from '../create-date';
import { getMonthNumberOfDays } from '../get-month-number-of-days';
import { getWeekNumber } from '../get-week-number';

// let getDay = jest.fn();
// jest.doMock('../create-month', () => {
//     return getDay
// })

describe('create month', () => {
    const date = new Date();
    const tzOffset = new Date().getTimezoneOffset() * 60000;
    const defaultDateWithOffset = date.getTime() + tzOffset;
    const dateWithOffset = new Date(defaultDateWithOffset);

    beforeEach(() => {
        set(date);
    });

    it('gets day', () => {
        const params = {
            date: dateWithOffset,
            locale: 'default',
        };
        const dayNumber = date.getDate();
        const getDay = (dayNumber = date.getDate()) => createDate(params);
        expect(getDay(dayNumber)).toEqual({
            date: date,
            day: date.toLocaleString('default', { weekday: 'long' }),
            dayNumber: date.getDate(),
            dayNumberInWeek: date.getDay() + 1,
            dayShort: date.toLocaleString('default', { weekday: 'short' }),
            month: date.toLocaleString('default', { month: 'long' }),
            monthIndex: date.getMonth(),
            monthNumber: date.getMonth() + 1,
            monthShort: date.toLocaleString('default', { month: 'short' }),
            timestamp: date.getTime(),
            week: getWeekNumber(date),
            year: date.getFullYear(),
            yearShort: date.toLocaleString('default', { year: '2-digit' }),
        });
    });

    afterEach(() => {
        reset();
    });
});
