import User from './User';

export default interface UsersObject {
	users: User[];
	total: number;
	skip: number;
	limit: number;
}
