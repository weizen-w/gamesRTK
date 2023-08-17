import styles from '../styles/GameInfo.module.css';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectGame } from '../selectors';
import { loadGameById } from '../gamesSlice';

export default function GameInfo(): JSX.Element {
	const { gameId } = useParams();
	const gameIdNumber = Number(gameId);
	const game = useAppSelector(selectGame);
	const dispatch = useAppDispatch();

	function openCloseImage(e: React.MouseEvent<HTMLImageElement, MouseEvent>): void {
		const clientWidth = document.documentElement.clientWidth;
		const clientHeight = document.documentElement.clientHeight;
		if (e.currentTarget.className === styles.screenshotActive) {
			e.currentTarget.className = styles.screenshot;
		} else {
			e.currentTarget.width = clientWidth * 0.9;
			e.currentTarget.height = clientHeight * 0.9;
			e.currentTarget.className = styles.screenshotActive;
		}
	}

	useEffect(() => {
		dispatch(loadGameById(gameIdNumber));
	}, [dispatch, gameId]);

	return (
		<div className={styles.page}>
			<Link to=".." className={styles.btnBack}>
				<p className={styles.btnLinkBack}>
					<ArrowBackIcon />
					Back
				</p>
			</Link>
			<div className={styles.leftBox}>
				<img className={styles.img} src={game.thumbnail} alt={game.title} />
				<p className={styles.platform_genre_box}>
					<span className={styles.genre}>{game.genre}</span>
					<span className={styles.platform}>{game.platform}</span>
				</p>
				<div className={styles.infoBox}>
					<h3 className={styles.infoTitle}>Information</h3>
					<p className={styles.infoText}>
						<b>Publisher:</b>
						{game.publisher}
					</p>
					<p className={styles.infoText}>
						<b>Developer:</b>
						{game.developer}
					</p>
					<p className={styles.infoText}>
						<b>Release date:</b>
						{game.release_date}
					</p>
					<p className={styles.infoText}>
						<b>Official page:</b>
						<a className={styles.officialPageLink} href={game.game_url} target="_blank">
							<OpenInNewOutlinedIcon />
							{game.title}
						</a>
					</p>
				</div>
				<div className={styles.requirementsBox}>
					<h3 className={styles.requirementsTitle}>Minimum system requirements</h3>
					{game?.minimum_system_requirements ? (
						<>
							<p className={styles.requirementsText} style={{ backgroundColor: '#757575' }}>
								<b style={{ color: 'black' }}>Os:</b>
								{game.minimum_system_requirements.os}
							</p>
							<p className={styles.requirementsText}>
								<b style={{ color: 'black' }}>Processor:</b>
								{game.minimum_system_requirements.processor}
							</p>
							<p className={styles.requirementsText} style={{ backgroundColor: '#757575' }}>
								<b style={{ color: 'black' }}>Memory:</b>
								{game.minimum_system_requirements.memory}
							</p>
							<p className={styles.requirementsText}>
								<b style={{ color: 'black' }}>Graphics:</b>
								{game.minimum_system_requirements.graphics}
							</p>
							<p className={styles.requirementsText} style={{ backgroundColor: '#757575' }}>
								<b style={{ color: 'black' }}>Storage:</b>
								{game.minimum_system_requirements.storage}
							</p>
						</>
					) : (
						<p>No data</p>
					)}
				</div>
			</div>
			<div className={styles.rigthBox}>
				<h1 className={styles.title}>{game.title}</h1>
				<a className={styles.freetogameLink} href={game.freetogame_profile_url} target="_blank">
					<img
						style={{ height: '40px' }}
						src="https://www.freetogame.com/assets/images/logo-footer.png"
						alt="freetogame"
					/>
					Freetogame profile
				</a>
				<h3>Description</h3>
				<p className={styles.description}>{game.description}</p>
				<h3>Screenshots</h3>
				<div className={styles.screenshotsBox}>
					{game.screenshots.map((img) => (
						<img
							className={styles.screenshot}
							key={img.id}
							src={img.image}
							alt={`screenshots-${String(img.id)}`}
							onClick={(e) => openCloseImage(e)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
