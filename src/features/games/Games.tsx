import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectGamesByOptions, selectParams } from './selectors';
import { loadGamesByParams } from './gamesSlice';
import styles from './Games.module.css';
import LeftBar from './LeftBar';

export default function Games(): JSX.Element {
	const games = useAppSelector(selectGamesByOptions);
	const params = useAppSelector(selectParams);
	const dispatch = useAppDispatch();
	function getPathByOptions(): string {
		return params.tags === ''
			? `games?platform=${params.platform}&sort-by=${params.sortBy}`
			: `filter?tag=${params.tags}&platform=${params.platform}&sort-by=${params.sortBy}`;
	}
	useEffect(() => {
		dispatch(loadGamesByParams(getPathByOptions()));
	}, [dispatch, params.platform, params.sortBy, params.tags]);
	return (
		<div className={styles.gamesPageStyle}>
			<LeftBar />
			<div className={styles.gamesBoxStyle}>
				{games instanceof Array ? (
					games.map((game) => (
						<div key={game.id} className={styles.gameCardStyle}>
							<img className={styles.imgStyle} src={game.thumbnail} alt={game.title} />
							<div className={styles.textBoxStyle}>
								<p className={styles.titleStyle}>{game.title}</p>
								<p className={styles.descriptionStyle}>{game.short_description}</p>
							</div>
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
