import { describe, expect, test } from "@jest/globals";
import { createMonth } from "../create-month";

describe('create month', () => {
    test('get month params', () => {
        const date = new Date('2023-02-01');
        const params = {
            locale: 'default',
            date: date,
        }

        expect(createMonth(params)).toEqual({
            
        })
    })
})