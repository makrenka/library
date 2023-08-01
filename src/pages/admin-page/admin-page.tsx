import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import { AdminContent } from '../../components/admin-content';
import { AdminMenu } from '../../components/admin-menu';

import styles from './admin-page.module.scss';

type AdminProps = {
    contentView: string;
};

export const Admin = ({ contentView }: AdminProps) => {
    const [isSortedDesc, setIsSortedDesc] = useState(true);

    const outletContext = useOutletContext();
    const isBookedChecked = outletContext instanceof Array && outletContext[0];
    const isDeliveriedChecked = outletContext instanceof Array && outletContext[1];

    return (
        <section className={styles.adminBooks}>
            <AdminMenu isSortedDesc={isSortedDesc} setIsSortedDesc={setIsSortedDesc} />
            <AdminContent isSortedDesc={isSortedDesc} isBookedChecked={isBookedChecked} isDeliveriedChecked={isDeliveriedChecked} />
        </section>
    );
};
