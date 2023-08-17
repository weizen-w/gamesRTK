import styles from '../styles/Auth.module.css';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { loadAuth } from '../usersSlice';
import { selectAuth } from '../selectors';

export default function Auth(): JSX.Element {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const auth = useAppSelector(selectAuth);
	const dispatch = useAppDispatch();

	function editStyleForm(): void {
		const registerForm = document.getElementById('registerForm');
		const loginForm = document.getElementById('loginForm');
		if (registerForm === null || loginForm === null) {
			console.log('ERROR NULL');
		} else {
			registerForm?.className === styles.registerForm
				? (registerForm.className = styles.registerFormActive)
				: (registerForm.className = styles.registerForm);
			loginForm?.className === styles.loginForm
				? (loginForm.className = styles.loginFormActive)
				: (loginForm.className = styles.loginForm);
		}
	}

	return (
		<div className={styles.loginPage}>
			<div className={styles.form}>
				<div className={styles.registerForm} id="registerForm">
					<input type="text" placeholder="name" />
					<input type="password" placeholder="password" />
					<input type="text" placeholder="email address" />
					<button>create</button>
					<p className={styles.message}>
						Already registered? <a onClick={editStyleForm}>Sign In</a>
					</p>
				</div>
				<div className={styles.loginFormActive} id="loginForm">
					<input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
					<input
						type="password"
						placeholder="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					{auth?.message !== '' ? <p className={styles.fa}>{auth.message}</p> : ''}
					{}
					<button
						onClick={() => {
							dispatch(loadAuth({ username, password }));
						}}
					>
						login
					</button>
					<p className={styles.message}>
						Not registered? <a onClick={editStyleForm}>Create an account</a>
					</p>
				</div>
			</div>
		</div>
	);
}
