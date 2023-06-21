import facebookIcon from '../components/social-link/assets/facebook.svg';
import instagramIcon from '../components/social-link/assets/instagram.svg';
import linkedinIcon from '../components/social-link/assets/linkedin.svg';
import vkIcon from '../components/social-link/assets/vk.svg';

export type SocialLinkType = {
    img: string;
    name: string;
    link: string;
};

export const SOCIAL_LINK = [
    {
        img: facebookIcon,
        name: 'facebook',
        link: '#',
    },
    {
        img: instagramIcon,
        name: 'instagram',
        link: '#',
    },
    {
        img: vkIcon,
        name: 'vk',
        link: '#',
    },
    {
        img: linkedinIcon,
        name: 'linkedin',
        link: '#',
    },
];
