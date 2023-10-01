import { describe, expect, it } from '@jest/globals';
import { createMonthDays } from '../create-month-days';
import { getWeekNumber } from '../get-week-number';

describe('create month days', () => {
    const date = new Date('2023-02-28');
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    it('gets days of the month', () => {
        expect(createMonthDays(monthIndex, year).length).toBe(28);
    });

    it('gets day of the month', () => {
        const lastDay = {
            date,
            day: 'вторник',
            dayNumber: 28,
            dayNumberInWeek: 3,
            dayShort: 'вт',
            month: 'февраль',
            monthIndex: 1,
            monthNumber: 2,
            monthShort: 'февр.',
            timestamp: 1677542400000,
            week: 9,
            year: 2023,
            yearShort: '23',
        };

        expect(createMonthDays(monthIndex, year)).toContainEqual(lastDay);
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

        expect(createMonthDays()).toContainEqual(day);
    });
});
