import { describe, expect, test } from "@jest/globals"
import { checkDateIsEqual } from "../check-date-is-equal"

describe('check date is equal', () => {
    test('date1 is equal date2', () => {
        const date1 = new Date('2023-01-01');
        const date2 = new Date('2023-01-01');
        expect(checkDateIsEqual(date1, date2)).toBeTruthy();
    });
});