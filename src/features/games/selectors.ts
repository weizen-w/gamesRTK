import { RootState } from '../../app/store';
import Game from './types/Game';
import GameInfo from './types/GameInfo';
import Params from './types/Params';

export const selectGamesByOptions = (state: RootState): Game[] => state.games.games;
export const selectParams = (state: RootState): Params => state.games.params;
export const selectGame = (state: RootState): GameInfo => state.games.game;
export const selectFavorite = (state: RootState): Game[] => state.games.favorite;
