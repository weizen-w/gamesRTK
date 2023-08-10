import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import styles from './Layout.module.css';

export default function Layout(): JSX.Element {
	return (
		<>
			<header className={styles.headerStyle}>
				<img className={styles.imgStyle} src="../../../header.avif" alt="header-logo" />
			</header>
			<NavBar />
			<Outlet />
			<footer className={styles.footerStyle}>
				EmptyFooter By Wladimir Weizen
			</footer>
		</>
	);
}
