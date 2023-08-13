import Game from './Game';
import Params from './Params';

export default interface GamesState {
	games: Game[];
	params: Params;
}
