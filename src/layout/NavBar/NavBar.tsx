import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

export default function NavBar(): JSX.Element {
	return (
		<nav className={styles.container}>
			<NavLink className={styles.link} to="/">
				Home
			</NavLink>
		</nav>
	);
}
