import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectGames } from './selectors';
import { loadGames } from './gamesSlice';
import styles from './Games.module.css';

export default function Games(): JSX.Element {
  const games = useAppSelector(selectGames);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);
  return (
    <div className={styles.gamesBoxStyle}>
      {games.map((game) => (
        <div key={game.id} className={styles.gameCardStyle}>
          <img className={styles.imgStyle} src={game.thumbnail} alt={game.title} />
          <div className={styles.textBoxStyle}>
            <p className={styles.titleStyle}>{game.title}</p>
            <p className={styles.descriptionStyle}>{game.short_description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
