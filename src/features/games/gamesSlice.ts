import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import GamesState from './types/GamesState';
import * as api from './api';

const initialState: GamesState = {
  games: [],
};

// eslint-disable-next-line import/prefer-default-export
export const loadGames = createAsyncThunk(
  'games/loadGames',
  () => api.getAll()
);

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadGames.fulfilled, (state, action) => {
        state.games = action.payload;
      });
  },
});

export default gamesSlice.reducer;
