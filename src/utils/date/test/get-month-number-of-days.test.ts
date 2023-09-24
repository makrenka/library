import { describe, expect, test } from "@jest/globals";
import { getMonthNumberOfDays } from "../get-month-number-of-days";

describe('get number of the day', () => {
    test('number of the day from the date', () => {
        expect(getMonthNumberOfDays(0)).toBe(31);
    });
});