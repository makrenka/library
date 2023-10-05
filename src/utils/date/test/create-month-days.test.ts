import { describe, expect, it } from '@jest/globals';
import { createMonthDays } from '../create-month-days';
import { getWeekNumber } from '../get-week-number';

describe('create month days', () => {
    const date = new Date('2023-10-05');
    date.setHours(0, 0, 0, 0);
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    it('gets days of the month', () => {
        expect(createMonthDays(monthIndex, year).length).toBe(31);
    });

    it('gets one day', () => {
        const tzOffset = date.getTimezoneOffset() * 60000;
        const defaultDateWithOffset = date.getTime() - tzOffset;
        const dateWithOffset = new Date(defaultDateWithOffset);

        const day = {
            date: dateWithOffset,
            day: 'четверг',
            dayNumber: 5,
            dayNumberInWeek: 5,
            dayShort: 'чт',
            month: 'октябрь',
            monthIndex: 9,
            monthNumber: 10,
            monthShort: 'окт.',
            timestamp: dateWithOffset.getTime(),
            week: 40,
            year: 2023,
            yearShort: '23',
        };

        expect(createMonthDays()).toContainEqual(day);
    });

    it('gets different days of the month', () => {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        const tzOffset = date.getTimezoneOffset() * 60000;
        const dayMs = 86400000;

        for (let i = 0; i < 7; i++) {
            const defaultDateWithOffset = date.getTime() - tzOffset - dayMs * i;
            const dateWithOffset = new Date(defaultDateWithOffset);
            const monthIndex = dateWithOffset.getMonth();
            const year = dateWithOffset.getFullYear();

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

            expect(createMonthDays(monthIndex, year)).toContainEqual(day);
        }
    });
});
