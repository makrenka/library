import { describe, expect, it } from '@jest/globals';
import { set, reset } from 'mockdate';

import { checkIsBlockedDate } from '../check-is-blocked';
import { createDate } from '../create-date';

describe('check is blocked date', () => {
    it('checks day', () => {
        const date = new Date();
        const tzOffset = new Date().getTimezoneOffset() * 60000;
        const dayMs = 86400000;
        const todayDate = new Date(date.getTime() - tzOffset);
        const params = {
            date,
            locale: 'default',
        };

        expect(
            (todayDate.getDay() + 1 === 7 || todayDate.getDay() + 1 === 1) &&
                checkIsBlockedDate(createDate(params), 1),
        ).toBeTruthy();
        expect(
            todayDate.getDay() + 1 === 5 &&
                new Date(todayDate.getTime() + dayMs * 3).getDay() + 1 === 2 &&
                checkIsBlockedDate(createDate(params), 1),
        ).toBeFalsy();
    });

    it('checks previous date', () => {
        const date = new Date();
        const dayMs = 86400000;
        const todayDate = createDate({ date });
        const previousDate = new Date(todayDate.timestamp - dayMs * 1);

        expect(checkIsBlockedDate(createDate({ date: previousDate }), 1)).toEqual(true);
    });

    it('checks isBookingDeliveryTime', () => {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        const tzOffset = new Date().getTimezoneOffset() * 60000;
        const dayMs = 86400000;
        const todayDate = createDate({ date });
        const bookingDate =
            todayDate.dayNumberInWeek === 6
                ? new Date(todayDate.timestamp + tzOffset + dayMs * 3)
                : todayDate.dayNumberInWeek === 7
                ? new Date(todayDate.timestamp + tzOffset + dayMs * 2)
                : new Date(todayDate.timestamp + tzOffset + dayMs);

        expect(checkIsBlockedDate(createDate({ date: bookingDate }), 1)).toEqual(false);
    });

    afterEach(() => {
        reset();
    });
});
