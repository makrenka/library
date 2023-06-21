import styles from './profile-empty.module.scss';

type ProfileEmptyProps = {
    data: string;
};

export const ProfileEmpty = ({ data }: ProfileEmptyProps) => (
    <div data-test-id='empty-blue-card' className={styles.data}>
        <div className={styles.text}>{data}</div>
    </div>
);
