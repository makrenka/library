import { Loader } from '../../components/loader/loader';
import { useAppSelector } from '../../store/hooks';
import { getUserSelector } from '../../store/user/selectors';

import { ProfileFunctions } from './profile-functions';
import { ProfileHeader } from './profile-header';
import { ProfileBody } from './ptofile-body';

import styles from './profile-page.module.scss';

export const ProfilePage = () => {
    const { data: user, isLoading } = useAppSelector(getUserSelector);

    return (
        <div className={styles.wrapper} data-test-id='profile-page'>
            {isLoading && <Loader />}
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
