import { AdminMenu } from '../../components/admin-menu';
import styles from './admin-page.module.scss';

type ContentViewProps = {
    contentView: string;
};

export const Admin = ({ contentView }: ContentViewProps) => (
    <section className={styles.adminBooks}>
        <AdminMenu />
        <main>{contentView === 'books' ? 'Books' : 'Users'}</main>
    </section>
);
