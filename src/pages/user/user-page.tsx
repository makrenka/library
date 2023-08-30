import { useLocation } from 'react-router-dom';

import { ProfileFunctions } from '../profile/profile-functions';
import { ProfileHeader } from '../profile/profile-header';
import { ProfileBody } from '../profile/ptofile-body';

import styles from './user-page.module.scss';

export const UserPage = () => {
    const location = useLocation();
    const { dataUser: user } = location.state;
    console.log(user);

    return (
        <div className={styles.wrapper} data-test-id='profile-page'>
            <ProfileHeader
                avatar={user.avatar}
                id={user.id}
                userFirstName={user?.firstName}
                userLastName={user?.lastName}
            />
            <ProfileBody user={user} />
            <ProfileFunctions user={user} />
        </div>
    );
};
