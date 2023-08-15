import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import GamesState from './types/GamesState';
import * as api from './api';
import Params from './types/Params';
import GameInfo from './types/GameInfo';

const initialStateGameInfo: GameInfo = {
	id: 0,
	title: '',
	thumbnail: '',
	status: '',
	short_description: '',
	description: '',
	game_url: '',
	genre: '',
	platform: '',
	publisher: '',
	developer: '',
	release_date: '',
	freetogame_profile_url: '',
	minimum_system_requirements: {
		os: '',
		processor: '',
		memory: '',
		graphics: '',
		storage: '',
	},
	screenshots: [
		{
			id: 0,
			image: '',
		},
	],
};
const initialStateParams: Params = {
	platform: 'all',
	sortBy: 'relevance',
	tags: '',
};
export const initialState: GamesState = {
	games: [],
	params: initialStateParams,
	game: initialStateGameInfo,
};

export const loadGamesByParams = createAsyncThunk('games/loadGamesByParams', (path: string) =>
	api.getGamesByParams(path)
);
export const loadGameById = createAsyncThunk('games/loadGameById', (id: number) =>
	api.getGameById(id)
);

const gamesSlice = createSlice({
	name: 'games',
	initialState,
	reducers: {
		changeParams: (state, action: PayloadAction<Params>) => {
			state.params = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadGamesByParams.fulfilled, (state, action) => {
				state.games = action.payload;
			})
			.addCase(loadGameById.fulfilled, (state, action) => {
				state.game = action.payload;
			});
	},
});

export default gamesSlice.reducer;
export const { changeParams } = gamesSlice.actions;
