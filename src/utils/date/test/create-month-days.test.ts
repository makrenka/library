import { describe, expect, it } from '@jest/globals';
import { createMonthDays } from '../create-month-days';

describe('create month days', () => {
    it('gets days of the month', () => {
        const date = new Date('2023-02-28');
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
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
});
