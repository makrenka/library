import { DetailedHTMLProps, HTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './hint.module.scss';

type HintProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    view: 'ghost' | 'error' | 'dark';
    href?: string;
};
export const Hint = ({ view, href, className, children, ...props }: HintProps) => {
    const hintClassName = classNames(
        styles.hint,
        className,
        view === 'ghost' && styles.ghost,
        view === 'error' && styles.error,
        view === 'dark' && styles.dark,
    );

    return (
        <div className={hintClassName} {...props} data-test-id='hint'>
            {href ? <a href={href}>{children}</a> : children}
        </div>
    );
};
