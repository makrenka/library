import { describe, expect } from '@jest/globals';
import { set, reset } from 'mockdate';

import { createMonth } from '../create-month';
import { getWeekNumber } from '../get-week-number';

describe('create month', () => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const tzOffset = new Date().getTimezoneOffset() * 60000;
    const defaultDateWithOffset = date.getTime() - tzOffset;
    const dateWithOffset = new Date(defaultDateWithOffset);
    const params = {
        date: dateWithOffset,
        locale: 'default',
    };

    beforeEach(() => {
        set(date);
    });

    it('gets day', () => {
        const dayNumber = date.getDate();

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

        expect(createMonth(params).getDay(dayNumber)).toEqual(day);
    });

    it('gets monthName, monthIndex, monthNumber, year', () => {
        const day = {
            monthName: dateWithOffset.toLocaleString('default', { month: 'long' }),
            monthIndex: dateWithOffset.getMonth(),
            monthNumber: dateWithOffset.getMonth() + 1,
            year: dateWithOffset.getFullYear(),
        };

        expect(createMonth(params)).toMatchObject(day);
    });

    it('gets month days', () => {
        expect(createMonth(params).createMonthDays()).toHaveLength(31);
    });

    it('gets no arguments', () => {
        const day = {
            monthName: dateWithOffset.toLocaleString('default', { month: 'long' }),
            monthIndex: dateWithOffset.getMonth(),
            monthNumber: dateWithOffset.getMonth() + 1,
            year: dateWithOffset.getFullYear(),
        };

        expect(createMonth()).toMatchObject(day);
    });

    afterEach(() => {
        reset();
    });
});
