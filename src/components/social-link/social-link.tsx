import { Link } from 'react-router-dom';

import styles from './social-link.module.scss';

type SocialLinkType = {
    img: string;
    name: string;
    link: string;
};

export const SocialLink = ({ img, name, link }: SocialLinkType) => (
    <Link to={link} className={styles.socialLink}>
        <img src={img} alt={name} className={styles.socialImg} />
    </Link>
);
