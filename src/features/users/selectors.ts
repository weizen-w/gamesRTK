import { RootState } from '../../app/store';
import UsersObject from './types/UsersObject';
import Auth from './types/Auth';
import User from './types/User';

export const selectUsers = (state: RootState): UsersObject => state.users.usersObject;
export const selectAuth = (state: RootState): Auth => state.users.auth;
export const selectUser = (state: RootState): User => state.users.currUser;
