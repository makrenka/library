import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

import styles from './profile-empty.module.scss';

type ProfileEmptyProps = {
    data: string;
};

export const ProfileEmpty = ({ data }: ProfileEmptyProps) => {
    const { pathname } = useLocation();

    return (
        <div
            data-test-id='empty-blue-card'
            className={classNames(styles.data, pathname.includes('admin') && styles.dataAdmin)}
        >
            <p className={classNames(styles.text, pathname.includes('admin') && styles.textAdmin)}>
                {data}
            </p>
        </div>
    );
};
