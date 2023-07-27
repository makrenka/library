import { useState } from 'react';

import { AdminContent } from '../../components/admin-content';
import { AdminMenu } from '../../components/admin-menu';

import styles from './admin-page.module.scss';

type ContentViewProps = {
    contentView: string;
};

export const Admin = ({ contentView }: ContentViewProps) => {
    const [isSortedDesc, setIsSortedDesc] = useState(true);

    return (
        <section className={styles.adminBooks}>
            <AdminMenu isSortedDesc={isSortedDesc} setIsSortedDesc={setIsSortedDesc} />
            <AdminContent isSortedDesc={isSortedDesc} />
        </section>
    );
};
