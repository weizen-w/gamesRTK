import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

export default function NavBar(): JSX.Element {
	return (
		<nav className={styles.container}>
			<img className={styles.logoStyle} src="../../../logo.jpg" alt="logo" />
			<NavLink className={styles.link} to="/">
				Home
			</NavLink>
			<NavLink className={styles.link} to="games">
				Games
			</NavLink>
		</nav>
	);
}
