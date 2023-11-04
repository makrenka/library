import { describe } from '@jest/globals';
import { getMonthesNames } from '../get-monthes-names';

describe('month names', () => {
    it('gets months array', () => {
        const month = {
            date: new Date('2024-01-01'),
            month: 'январь',
            monthIndex: 0,
            monthShort: 'янв.',
        };

        expect(getMonthesNames()).toHaveLength(12);
        expect(getMonthesNames()).toContainEqual(month);
    });
});
