import styles from './Layout.module.css';
import github from '../../../github.png'
import header from '../../../header.avif'
import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

export default function Layout(): JSX.Element {
	return (
		<>
			<header className={styles.headerStyle}>
				<img className={styles.imgStyle} src={header} alt="header-logo" />
			</header>
			<NavBar />
			<Outlet />
			<footer className={styles.footerStyle}>
				<p>
					<b>Germany, Cologne</b> © Wladimir Weizen, 2023
				</p>
				<p>
					<b>Follow me:</b>
					<a className={styles.link} target="_blank" href="https://github.com/weizen-w">
						<span>My profil</span>
						<img src={github} alt="github" />
					</a>
					<a
						className={styles.link}
						target="_blank"
						href="https://github.com/weizen-w/gamesRTK.git"
					>
						<span>Repositories</span>
						<img src={github} alt="github" />
					</a>
				</p>
			</footer>
		</>
	);
}
