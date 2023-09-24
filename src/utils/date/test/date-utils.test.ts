import { describe, expect, test } from "@jest/globals";
import { formatDate } from "../date-utils";

describe('format date', () => {
    test('getting day and month of the date', () => {
        const date = new Date('2023-02-01').toISOString();
        expect(formatDate(date)).toBe('01.02');
    });
});