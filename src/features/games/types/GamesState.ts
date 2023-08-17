import Game from './Game';
import GameInfo from './GameInfo';
import Params from './Params';

export default interface GamesState {
	games: Game[];
	params: Params;
	game: GameInfo;
	favorite: Game[];
}
