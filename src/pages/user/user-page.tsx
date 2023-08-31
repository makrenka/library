import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Loader } from '../../components/loader/loader';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { resetUserForAdmin, userForAdminRequest } from '../../store/user';
import { getUserSelector } from '../../store/user/selectors';
import { ProfileFunctions } from '../profile/profile-functions';
import { ProfileHeader } from '../profile/profile-header';
import { ProfileBody } from '../profile/ptofile-body';

import styles from './user-page.module.scss';

export const UserPage = () => {
    const dispatch = useAppDispatch();
    const { userForAdmin: user, isLoading } = useAppSelector(getUserSelector);
    const { userId } = useParams();
    console.log(user);

    useEffect(() => {
        if (userId) {
            dispatch(userForAdminRequest(userId));
        }

        return () => {
            dispatch(resetUserForAdmin());
        };
    }, [userId, dispatch]);

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
