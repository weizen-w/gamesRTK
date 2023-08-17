import styles from './Home.module.css';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectGamesByOptions } from '../../features/games/selectors';
import { loadGamesByParams } from '../../features/games/gamesSlice';
import { useEffect } from 'react';

export default function Home(): JSX.Element {
	const games = useAppSelector(selectGamesByOptions);
	const dispatch = useAppDispatch();

	function getIcon(str: string): JSX.Element {
		if (str.includes('PC (Windows)') && str.includes('Web Browser')) {
			return (
				<>
					<DesktopWindowsOutlinedIcon />
					<LanguageOutlinedIcon />
				</>
			);
		}
		if (str.includes('PC (Windows)')) {
			return <DesktopWindowsOutlinedIcon />;
		} else {
			return <LanguageOutlinedIcon />;
		}
	}

	useEffect(() => {
		dispatch(loadGamesByParams('games?platform=all&sort-by=relevance')); //TODO *hardcode
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.leftBox}>
				<div className={styles.welcomeBox}>
					<p style={{ fontSize: '40px' }}>Welcome</p>
					<p>
						Our site was developed for the final project on the "Frontend" module. Author Wladimir
						Weizen.
					</p>
					<p>
						On the site you can find and get information about computer and browser{' '}
						<Link to={'/games'}>games</Link>.
					</p>
					<p>Get all the benefits from our site. Login or Register</p>
					<Link to={'/auth'}>Authorization page</Link>
				</div>
				<div>
					<img
						className={styles.imageBox}
						src="https://i.artfile.me/wallpaper/21-06-2014/1920x1080/video-igry-drugoe-kollazh-video-igry-per-838953.jpg"
						alt="logo-games"
					/>
				</div>
			</div>
			<div className={styles.rightBox}>
				<p>Recently Added</p>
				<div className={styles.recentlyBox}>
					{games
						.filter((game) => game.id > 550)
						.map((game) => (
							<div key={game.id} className={styles.gameCardStyle}>
								<Link
									className={styles.gameCardStyle}
									style={{ textDecoration: 'none' }}
									to={`./games/${game.id}`}
								>
									<img className={styles.imgStyle} src={game.thumbnail} alt={game.title} />
									<div className={styles.textBoxStyle}>
										<p className={styles.titleStyle}>{game.title}</p>
										<p className={styles.descriptionStyle}>{game.short_description}</p>
									</div>
									<div className={styles.genrePlatformBox}>
										<span className={styles.genre}>{game.genre}</span>
										<span className={styles.platform}>{getIcon(game.platform)}</span>
									</div>
								</Link>
							</div>
						))}
					<Link className={styles.btnMore} to={'./games'}>
						More Games
					</Link>
				</div>
			</div>
		</div>
	);
}
