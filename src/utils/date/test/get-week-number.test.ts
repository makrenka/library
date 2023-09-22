import { describe, expect, test } from "@jest/globals";
import { getWeekNumber } from "../get-week-number";

describe('get week number', () => {
    test('week number of the date', () => {
        const date = new Date('2023-01-01');
        expect(getWeekNumber(date)).toBe(1);
    });
});