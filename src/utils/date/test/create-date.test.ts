import { describe, expect, test } from "@jest/globals";
import { createDate } from "../create-date";

describe('create date', () => {
    test('get date params', () => {
        const date = new Date('2023-02-01');
        const params = {
            locale: 'default',
            date: date,
        }
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
        })
    })
})