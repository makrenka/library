import { describe, expect, jest, test } from '@jest/globals';
import { set, reset } from 'mockdate';

import { createMonth } from '../create-month';
import { createDate } from '../create-date';
import { getMonthNumberOfDays } from '../get-month-number-of-days';

// let getDay = jest.fn();
// jest.doMock('../create-month', () => {
//     return getDay
// })

describe('create month', () => {
    const date = new Date();

    beforeEach(() => {
        set(date);
    });

    it('gets day', () => {
        const params = {
            date: date,
            locale: 'default',
        }
        const dayNumber = date.getDate();
        const getDay = (dayNumber = date.getDate()) =>
            createDate(params);
        expect(getDay(dayNumber)).toEqual({
            date: date,

        });
    })

    afterEach(() => {
        reset();
    });
});
