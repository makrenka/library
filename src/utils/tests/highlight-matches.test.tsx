/**
 * @jest-environment jsdom
 */
import React from 'react';
import { describe, it, jest } from '@jest/globals';
import renderer from 'react-test-renderer';

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
        const component = renderer
            .create(
                <React.Fragment>
                    <span style={{ color: '#FF5253' }} data-test-id='highlight-matches'>
                        хули
                    </span>
                    {substr}
                </React.Fragment>,
            )
            .toJSON();

        expect(highlightMatches('хули', 'хулиномика')).toEqual(component);
    });
});
