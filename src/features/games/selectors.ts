import { RootState } from '../../app/store';
import Game from './types/Game';

// eslint-disable-next-line import/prefer-default-export
export const selectGames = (state: RootState): Game[] => state.games.games;
