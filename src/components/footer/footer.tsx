import { SOCIAL_LINK } from '../../constants/footer';
import { SocialLink } from '../social-link';

import styles from './footer.module.scss';

export const Footer = () => {
    const thisYear = new Date().getFullYear();

    return (
        <footer className={styles.footerBlock}>
            <hr className={styles.line} />
            <div className={styles.footer}>
                <span className={styles.copyright}>
                    © 2020-{thisYear} Cleverland. Все права защищены.
                </span>
                <div className={styles.socialLinks}>
                    {SOCIAL_LINK.map(({ img, name, link }) => (
                        <SocialLink img={img} name={name} link={link} key={name.toString()} />
                    ))}
                </div>
            </div>
        </footer>
    );
};
