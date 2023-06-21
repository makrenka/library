import { Link } from '../../link/link';

import styles from './form-footer.module.scss';

type FormFooterType = {
    link?: string;
    text: string;
    linkText?: string;
};

export const FormFooter = ({ link, text, linkText }: FormFooterType) => (
    <div className={styles.wrapper}>
        <span className={styles.description}>{text}</span>
        {link && linkText && <Link href={link} text={linkText} arrowSide='right' />}
    </div>
);
