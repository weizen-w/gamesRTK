import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gamesReducer from '../features/games/gamesSlice';
import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
	reducer: {
		games: gamesReducer,
		users: usersReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
