import { Link as RouterLink } from 'react-router-dom';
import classNames from 'classnames';

import { ReactComponent as Arrow } from './assets/arrow.svg';

import styles from './link.module.scss';

type LinkProps = {
    href: string;
    text: string;
    arrowSide: 'left' | 'right';
    view?: 'light' | 'dark';
};

export const Link = ({ href, text, arrowSide, view = 'dark' }: LinkProps) => (
    <RouterLink to={href} className={classNames(styles.link, styles[view])}>
        {arrowSide === 'left' && <Arrow className={styles[arrowSide]} />}
        <span>{text}</span>
        {arrowSide === 'right' && <Arrow />}
    </RouterLink>
);
