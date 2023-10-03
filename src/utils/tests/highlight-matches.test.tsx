import { describe, it } from '@jest/globals';

import { highlightMatches } from '../highlight-matches';

describe('highlight matches', () => {
    it('returns str', () => {
        expect(highlightMatches('', 'хулиномика')).toBe('хулиномика');
    });

    it('has not matches', () => {
        expect(highlightMatches('хули', '')).toBe('');
    });

    it('searches matches', () => {
        const substr = 'номика';

        expect(highlightMatches('хули', 'хулиномика')).toContain(substr);
    });
});
