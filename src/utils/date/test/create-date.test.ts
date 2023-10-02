import { describe, expect, test } from '@jest/globals';
import { createDate } from '../create-date';
import { getWeekNumber } from '../get-week-number';

describe('create date', () => {
    it('gets date params', () => {
        const date = new Date('2023-02-01');
        const params = {
            locale: 'default',
            date: date,
        };
        const tzOffset = new Date().getTimezoneOffset() * 60000;

        expect(createDate(params)).toEqual({
            date: new Date(date.getTime() - tzOffset),
            dayNumber: 1,
            day: 'среда',
            dayNumberInWeek: 4,
            dayShort: 'ср',
            year: 2023,
            yearShort: '23',
            month: 'февраль',
            monthShort: 'февр.',
            monthNumber: 2,
            monthIndex: 1,
            timestamp: 1675220400000,
            week: 5,
        });
    });

    it('gets no arguments', () => {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        const tzOffset = date.getTimezoneOffset() * 60000;
        const defaultDateWithOffset = date.getTime() - tzOffset;
        const dateWithOffset = new Date(defaultDateWithOffset);
        const day = {
            date: dateWithOffset,
            day: dateWithOffset.toLocaleString('default', { weekday: 'long' }),
            dayNumber: dateWithOffset.getDate(),
            dayNumberInWeek: dateWithOffset.getDay() + 1,
            dayShort: dateWithOffset.toLocaleString('default', { weekday: 'short' }),
            month: dateWithOffset.toLocaleString('default', { month: 'long' }),
            monthIndex: dateWithOffset.getMonth(),
            monthNumber: dateWithOffset.getMonth() + 1,
            monthShort: dateWithOffset.toLocaleString('default', { month: 'short' }),
            timestamp: dateWithOffset.getTime(),
            week: getWeekNumber(dateWithOffset),
            year: dateWithOffset.getFullYear(),
            yearShort: dateWithOffset.toLocaleString('default', { year: '2-digit' }),
        };

        expect(createDate()).toEqual(day);
    });
});
