import Auth from './types/Auth';
import User from './types/User';
import UsersObject from './types/UsersObject';

export async function getAllUsers(): Promise<UsersObject> {
	const res = await fetch('https://dummyjson.com/users');
	return res.json();
}
export async function getUser(id: number): Promise<User> {
	const res = await fetch(`https://dummyjson.com/users/${id}`);
	return res.json();
}
export async function getAuth(username: string, password: string): Promise<Auth> {
	const res = await fetch('https://dummyjson.com/auth/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			username: username,
			password: password,
			// expiresInMins: 60, // optional
		}),
	});
	return res.json();
}
