import styles from '../styles/Games.module.css';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import Game from '../types/Game';
import LeftBar from './LeftBar';
import { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectFavorite, selectGamesByOptions, selectParams } from '../selectors';
import { addFavorite, loadGamesByParams } from '../gamesSlice';

export default function Games(): JSX.Element {
	const { gameId } = useParams();
	const games = useAppSelector(selectGamesByOptions);
	const params = useAppSelector(selectParams);
	const favorite = useAppSelector(selectFavorite);
	const [favoriteSet, setFavoriteSet] = useState<Set<Game>>(new Set(favorite));
	const dispatch = useAppDispatch();

	function getPathByOptions(): string {
		return params.tags === ''
			? `games?platform=${params.platform}&sort-by=${params.sortBy}`
			: `filter?tag=${params.tags}&platform=${params.platform}&sort-by=${params.sortBy}`;
	}
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
	function addOrDeleteFavorite(game: Game): void {
		console.log(favoriteSet);
		console.log(favoriteSet.has(game));
		if (favoriteSet.has(game)) {
			favoriteSet.delete(game);
			setFavoriteSet(new Set(favoriteSet));
			dispatch(addFavorite(game));
		} else {
			setFavoriteSet(new Set(favoriteSet.add(game)));
			dispatch(addFavorite(game));
		}
	}
	function getGames(arr: Game[]): JSX.Element {
		return (
			<div className={styles.gamesPageStyle}>
				<LeftBar />
				<div className={styles.gamesBoxStyle}>
					{arr instanceof Array ? (
						arr.map((el) => (
							<div key={el.id} className={styles.gameCardStyle}>
								{favoriteSet.has(el) ? (
									<BookmarkOutlinedIcon
										onClick={() => addOrDeleteFavorite(el)}
										className={styles.favoriteIcon}
									/>
								) : (
									<BookmarkAddOutlinedIcon
										onClick={() => addOrDeleteFavorite(el)}
										className={styles.favoriteIcon}
									/>
								)}
								<Link
									className={styles.gameCardStyle}
									style={{ textDecoration: 'none' }}
									to={`./${el.id}`}
								>
									<img className={styles.imgStyle} src={el.thumbnail} alt={el.title} />
									<div className={styles.textBoxStyle}>
										<p className={styles.titleStyle}>{el.title}</p>
										<p className={styles.descriptionStyle}>{el.short_description}</p>
									</div>
									<div className={styles.genrePlatformBox}>
										<span className={styles.genre}>{el.genre}</span>
										<span className={styles.platform}>{getIcon(el.platform)}</span>
									</div>
								</Link>
							</div>
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
	}, [params.platform, params.sortBy, params.tags]);

	return gameId ? <Outlet /> : getGames(games);
}
