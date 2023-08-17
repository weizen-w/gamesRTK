import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUsers } from '../selectors';
import { loadUsers } from '../usersSlice';

export default function Users(): JSX.Element {
	const users = useAppSelector(selectUsers);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(loadUsers());
	}, []);
	return (
		<div>
			{users.users.map((user) => (
				<ul key={user.id}>
					<li>
						{user.firstName} {user.lastName}
					</li>
				</ul>
			))}
		</div>
	);
}
