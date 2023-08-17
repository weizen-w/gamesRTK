import Auth from './Auth';
import User from './User';
import UsersObject from './UsersObject';

export default interface UsersState {
	usersObject: UsersObject;
	auth: Auth;
	currUser: User;
}
