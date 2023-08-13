import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import GamesState from './types/GamesState';
import * as api from './api';
import Params from './types/Params';

const initialStateParams: Params = {
	platform: 'all',
	sortBy: 'relevance',
	tags: '',
};

export const initialState: GamesState = {
	games: [],
	params: initialStateParams,
};

export const loadGamesByParams = createAsyncThunk(
	'games/loadGamesByParams',
	(path: string) => api.getAllByParams(path)
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
		builder.addCase(loadGamesByParams.fulfilled, (state, action) => {
			state.games = action.payload;
		});
	},
});

export default gamesSlice.reducer;
export const { changeParams } = gamesSlice.actions;
