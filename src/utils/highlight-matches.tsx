import React from 'react';

export const highlightMatches = (
    filter: string,
    str: string,
): string | Array<string | JSX.Element> => {
    if (!filter.length) return str;
    const regexp = new RegExp(filter, 'ig');
    const matchValue = str.match(regexp);

    if (matchValue) {
        return str.split(regexp).map((substr, index, arr) => {
            if (index < arr.length - 1) {
                const match = matchValue.shift();

                return (
                    <React.Fragment>
                        {substr}
                        <span style={{ color: '#FF5253' }} data-test-id='highlight-matches'>
                            {match}
                        </span>
                    </React.Fragment>
                );
            }

            return substr;
        });
    }

    return str;
};
