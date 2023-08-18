import styles from './NavBar.module.css';
import logo from '../../../logo.jpg';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectAuth } from '../../features/users/selectors';

export default function NavBar(): JSX.Element {
	const auth = useAppSelector(selectAuth);

	return (
		<nav className={styles.container}>
			<div className={styles.leftBox}>
				<Link className={styles.linkLogoStyle} to="/">
					<img className={styles.logoStyle} src={logo} alt="logo" />
				</Link>
				<NavLink className={styles.link} to="/">
					Home
				</NavLink>
				<NavLink className={styles.link} to="games">
					Games
				</NavLink>
			</div>
			<div className={styles.rightBox}>
				{auth?.username ? (
					<>
						{/* <NavLink className={styles.link} to="users">
							Users
						</NavLink> */}
						<NavLink className={styles.link} to="profil">
							Profil
						</NavLink>
					</>
				) : (
					''
				)}
				<NavLink className={styles.link} to="auth">
					Sign In
				</NavLink>
			</div>
		</nav>
	);
}
