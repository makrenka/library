import { describe, it } from "@jest/globals";
import renderer from 'react-test-renderer';
import { highlightMatches } from "../highlight-matches";
import React from "react";

describe('highlight matches', () => {
    it('returns str', () => {
        expect(highlightMatches('', 'хулиномика')).toBe('хулиномика');
    })

    it('searches matches', () => {
        const substr = "номика";
        const component = renderer
            .create(
                <React.Fragment key={substr}>
                    {substr}
                    <span style={{ color: '#FF5253' }} data-test-id='highlight-matches'>
                        хули
                    </span>
                </React.Fragment>
            ).toJSON();

        expect(component).toMatchSnapshot();
    });
});