import { Button } from '../button';

import styles from './status-info.module.scss';

type StatusBlockProps = {
    title?: string;
    description: string;
    buttonText?: string;
    buttonAction?: () => void;
};

export const StatusInfo = ({ title, description, buttonText, buttonAction }: StatusBlockProps) => (
    <div className={styles.container} data-test-id='status-block'>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.description}>{description}</div>
        {buttonText && (
            <Button view='primary' onClick={buttonAction} classButton={styles.button}>
                {buttonText}
            </Button>
        )}
    </div>
);
