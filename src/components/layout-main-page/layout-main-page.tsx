import { Outlet } from 'react-router-dom';

import { Navigation } from '../navigation';

import styles from './layout-main-page.module.scss';

export const LayoutMainPage = () => (
    <div className={styles.layoutMainPage}>
        <div className={styles.navigation}>
            <Navigation dataTestid='navigation' />
        </div>
        <Outlet />
    </div>
);
