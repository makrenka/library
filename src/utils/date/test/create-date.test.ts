import { describe, expect, it } from '@jest/globals';
import { createDate } from '../create-date';
import { getWeekNumber } from '../get-week-number';

describe('create date', () => {
    it('gets different days', () => {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        const tzOffset = date.getTimezoneOffset() * 60000;
        const dayMs = 86400000;

        for (let i = 0; i < 7; i++) {
            const defaultDateWithOffset = date.getTime() - tzOffset - dayMs * i;
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

            expect(createDate({ date: new Date(dateWithOffset.getTime() + tzOffset) })).toEqual(day);
        }
    });
});
