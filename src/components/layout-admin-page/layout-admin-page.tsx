import { Outlet } from 'react-router-dom';

import { AdminNavigation } from '../admin-navigation';

import styles from './layout-admin-page.module.scss';

export const LayoutAdminPage = () => (
    <div className={styles.layoutAdminPage}>
        <div className={styles.adminNavigation}>
            <AdminNavigation />
        </div>
        <Outlet />
    </div>
);
