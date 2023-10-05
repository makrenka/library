import { describe, expect, it } from '@jest/globals';

import { checkIsBlockedDate } from '../check-is-blocked';
import { createDate } from '../create-date';

describe('check is blocked date', () => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const tzOffset = new Date().getTimezoneOffset() * 60000;
    const todayDate = createDate({ date: date, locale: 'default' });
    const dayMs = 86400000;

    it('checks sunday', () => {
        if (todayDate.dayNumberInWeek === 1) {
            expect(checkIsBlockedDate(createDate({ date }), 1)).toBeTruthy();
            const monday = new Date(todayDate.timestamp + dayMs + tzOffset);
            expect(checkIsBlockedDate(createDate({ date: monday }), 1)).toBeFalsy();
            const tuesday = new Date(todayDate.timestamp + dayMs * 2);
            expect(checkIsBlockedDate(createDate({ date: tuesday }), 1)).toBeTruthy();
            const saturday = new Date(todayDate.timestamp - dayMs);
            expect(checkIsBlockedDate(createDate({ date: saturday }), 1)).toBeTruthy();
            const friday = new Date(todayDate.timestamp + dayMs * 5);
            expect(checkIsBlockedDate(createDate({ date: friday }), 1)).toBeTruthy();
        }
    });

    it('checks monday', () => {
        if (todayDate.dayNumberInWeek === 2) {
            expect(checkIsBlockedDate(createDate({ date }), 1)).toBeFalsy();
            const tuesday = new Date(todayDate.timestamp + dayMs + tzOffset);
            expect(checkIsBlockedDate(createDate({ date: tuesday }), 1)).toBeFalsy();
            const sunday = new Date(todayDate.timestamp - dayMs);
            expect(checkIsBlockedDate(createDate({ date: sunday }), 1)).toBeTruthy();
            const friday = new Date(todayDate.timestamp + dayMs * 4);
            expect(checkIsBlockedDate(createDate({ date: friday }), 1)).toBeTruthy();
            const saturday = new Date(todayDate.timestamp + dayMs * 5);
            expect(checkIsBlockedDate(createDate({ date: saturday }), 1)).toBeTruthy();
        }
    });

    it('checks tuesday', () => {
        if (todayDate.dayNumberInWeek === 3) {
            expect(checkIsBlockedDate(createDate({ date }), 1)).toBeFalsy();
            const wednesday = new Date(todayDate.timestamp + dayMs + tzOffset);
            expect(checkIsBlockedDate(createDate({ date: wednesday }), 1)).toBeFalsy();
            const monday = new Date(todayDate.timestamp - dayMs);
            expect(checkIsBlockedDate(createDate({ date: monday }), 1)).toBeTruthy();
            const friday = new Date(todayDate.timestamp + dayMs * 3);
            expect(checkIsBlockedDate(createDate({ date: friday }), 1)).toBeTruthy();
            const saturday = new Date(todayDate.timestamp + dayMs * 4);
            expect(checkIsBlockedDate(createDate({ date: saturday }), 1)).toBeTruthy();
            const sunday = new Date(todayDate.timestamp + dayMs * 5);
            expect(checkIsBlockedDate(createDate({ date: sunday }), 1)).toBeTruthy();
        };
    });

    it('checks wednesday', () => {
        if (todayDate.dayNumberInWeek === 4) {
            expect(checkIsBlockedDate(createDate({ date }), 1)).toBeFalsy();
            const thursday = new Date(todayDate.timestamp + dayMs + tzOffset);
            expect(checkIsBlockedDate(createDate({ date: thursday }), 1)).toBeFalsy();
            const tuesday = new Date(todayDate.timestamp - dayMs);
            expect(checkIsBlockedDate(createDate({ date: tuesday }), 1)).toBeTruthy();
            const friday = new Date(todayDate.timestamp + dayMs * 2);
            expect(checkIsBlockedDate(createDate({ date: friday }), 1)).toBeTruthy();
            const saturday = new Date(todayDate.timestamp + dayMs * 3);
            expect(checkIsBlockedDate(createDate({ date: saturday }), 1)).toBeTruthy();
            const sunday = new Date(todayDate.timestamp + dayMs * 4);
            expect(checkIsBlockedDate(createDate({ date: sunday }), 1)).toBeTruthy();
        };
    });

    it('checks thursday', () => {
        if (todayDate.dayNumberInWeek === 5) {
            expect(checkIsBlockedDate(createDate({ date }), 1)).toBeFalsy();
            const friday = new Date(todayDate.timestamp + dayMs + tzOffset);
            expect(checkIsBlockedDate(createDate({ date: friday }), 1)).toBeFalsy();
            const wednesday = new Date(todayDate.timestamp - dayMs);
            expect(checkIsBlockedDate(createDate({ date: wednesday }), 1)).toBeTruthy();
            const saturday = new Date(todayDate.timestamp + dayMs * 2);
            expect(checkIsBlockedDate(createDate({ date: saturday }), 1)).toBeTruthy();
            const sunday = new Date(todayDate.timestamp + dayMs * 3);
            expect(checkIsBlockedDate(createDate({ date: sunday }), 1)).toBeTruthy();
        };
    });

    it('checks friday', () => {
        if (todayDate.dayNumberInWeek === 6) {
            expect(checkIsBlockedDate(createDate({ date }), 1)).toBeFalsy();
            const thursday = new Date(todayDate.timestamp - dayMs);
            expect(checkIsBlockedDate(createDate({ date: thursday }), 1)).toBeTruthy();
            const saturday = new Date(todayDate.timestamp + dayMs);
            expect(checkIsBlockedDate(createDate({ date: saturday }), 1)).toBeTruthy();
            const sunday = new Date(todayDate.timestamp + dayMs * 2);
            expect(checkIsBlockedDate(createDate({ date: sunday }), 1)).toBeTruthy();
            const monday = new Date(todayDate.timestamp + dayMs * 3);
            expect(checkIsBlockedDate(createDate({ date: monday }), 1)).toBeFalsy();
        };
    });

    it('checks saturday', () => {
        if (todayDate.dayNumberInWeek === 7) {
            expect(checkIsBlockedDate(createDate({ date }), 1)).toBeTruthy();
            const friday = new Date(todayDate.timestamp - dayMs);
            expect(checkIsBlockedDate(createDate({ date: friday }), 1)).toBeTruthy();
            const sunday = new Date(todayDate.timestamp + dayMs);
            expect(checkIsBlockedDate(createDate({ date: sunday }), 1)).toBeTruthy();
            const monday = new Date(todayDate.timestamp + dayMs * 2);
            expect(checkIsBlockedDate(createDate({ date: monday }), 1)).toBeFalsy();
        };
    });
});
