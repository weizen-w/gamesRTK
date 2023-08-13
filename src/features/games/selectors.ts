import { RootState } from '../../app/store';
import Game from './types/Game';
import Params from './types/Params';

export const selectGamesByOptions = (state: RootState): Game[] => state.games.games;
export const selectParams = (state: RootState): Params => state.games.params;
