import Lottie from 'lottie-react';

import loader from './assets/loader2.json';

import styles from './loader.module.scss';

export const Loader = () => (
    <div className={styles.wrapper} data-test-id='loader'>
        <Lottie animationData={loader} loop={true} className={styles.loader} />
    </div>
);
