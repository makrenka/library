import { describe, expect, test } from "@jest/globals";
import { createMonthDays } from "../create-month-days";

describe('create month days', () => {
    test('get days of the month', () => {
        const date = new Date('2023-02-28');
        const params = {
            locale: 'default',
            monthIndex: date.getMonth(),
            year: date.getFullYear(),
        };

        expect(createMonthDays(params)).toEqual([{
            date,
            day: "вторник",
            dayNumber: 28,
            dayNumberInWeek: 3,
            dayShort: "вт",
            month: "февраль",
            monthIndex: 1,
            monthNumber: 2,
            monthShort: "февр.",
            timestamp: 1677542400000,
            week: 10,
            year: 2023,
            yearShort: "23",
        }])
    })
})