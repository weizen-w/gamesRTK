import { useEffect } from 'react';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { Link, Outlet, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectGamesByOptions, selectParams } from '../selectors';
import { loadGamesByParams } from '../gamesSlice';
import Game from '../types/Game';
import LeftBar from './LeftBar';
import styles from '../styles/Games.module.css';

export default function Games(): JSX.Element {
	const { gameId } = useParams();
	const games = useAppSelector(selectGamesByOptions);
	const params = useAppSelector(selectParams);
	const dispatch = useAppDispatch();

	function getPathByOptions(): string {
		return params.tags === ''
			? `games?platform=${params.platform}&sort-by=${params.sortBy}`
			: `filter?tag=${params.tags}&platform=${params.platform}&sort-by=${params.sortBy}`;
	}
	function getIcon(str: string): JSX.Element {
		if (str.includes('PC (Windows)') && str.includes('Web Browser')) {
			return (<><DesktopWindowsOutlinedIcon /><LanguageOutlinedIcon /></>);
		}
		if (str.includes('PC (Windows)')) {
			return <DesktopWindowsOutlinedIcon />;
		} else {
			return <LanguageOutlinedIcon />;
		}
	}
	function getGames(arr: Game[]): JSX.Element {
		return (
			<div className={styles.gamesPageStyle}>
				<LeftBar />
				<div className={styles.gamesBoxStyle}>
					{arr instanceof Array ? (
						arr.map((arr) => (
							<Link key={arr.id} style={{ textDecoration: 'none' }} to={`./${arr.id}`}>
								<div className={styles.gameCardStyle}>
									<img className={styles.imgStyle} src={arr.thumbnail} alt={arr.title} />
									<div className={styles.textBoxStyle}>
										<p className={styles.titleStyle}>{arr.title}</p>
										<p className={styles.descriptionStyle}>{arr.short_description}</p>
									</div>
									<div className={styles.genrePlatformBox}>
										<span className={styles.genre}>{arr.genre}</span>
										<span className={styles.platform}>{getIcon(arr.platform)}</span>
									</div>
								</div>
							</Link>
						))
					) : (
						<p>
							<img className={styles.noResultImg} src="../../../noResult.jpg" alt="noResult" />
						</p>
					)}
				</div>
			</div>
		);
	}

	useEffect(() => {
		dispatch(loadGamesByParams(getPathByOptions()));
	}, [dispatch, params.platform, params.sortBy, params.tags]);
	return gameId ? <Outlet /> : getGames(games);
}
