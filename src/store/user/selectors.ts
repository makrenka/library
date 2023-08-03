import { RootState } from '..';

export const getUserSelector = (state: RootState) => state.user;
export const getUsersListSelector = (state: RootState) => state.user.usersList;