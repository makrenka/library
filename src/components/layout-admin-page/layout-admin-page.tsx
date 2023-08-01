import { Outlet } from 'react-router-dom';
import { useState } from 'react';

import { AdminNavigation } from '../admin-navigation';

import styles from './layout-admin-page.module.scss';

export const LayoutAdminPage = () => {
    const [isBookedChecked, setIsBookedChecked] = useState(true);
    const [isDeliveriedChecked, setIsDeliveriedChecked] = useState(true);

    return (
        <div className={styles.layoutAdminPage}>
            <div className={styles.adminNavigation}>
                <AdminNavigation setIsBookedChecked={setIsBookedChecked} setIsDeliveriedChecked={setIsDeliveriedChecked} />
            </div>
            <Outlet context={[isBookedChecked, isDeliveriedChecked]} />
        </div>
    );
};
