import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';
import UsersState from './types/UsersState';
import Auth from './types/Auth';
import UsersObject from './types/UsersObject';
import User from './types/User';

export const initialStateUser: User = {
	id: 0,
	firstName: '',
	lastName: '',
	maidenName: '',
	age: 0,
	gender: '',
	email: '',
	phone: '',
	username: '',
	password: '',
	birthDate: '',
	image: '',
	bloodGroup: '',
	height: 0,
	weight: 0,
	eyeColor: '',
	hair: {
		color: '',
		type: '',
	},
	domain: '',
	ip: '',
	address: {
		address: '',
		city: '',
		coordinates: {
			lat: 0,
			lng: 0,
		},
		postalCode: '',
		state: '',
	},
	macAddress: '',
	university: '',
	bank: {
		cardExpire: '',
		cardNumber: '',
		cardType: '',
		currency: '',
		iban: '',
	},
	company: {
		address: {
			address: '',
			city: '',
			coordinates: {
				lat: 0,
				lng: 0,
			},
			postalCode: '',
			state: '',
		},
		department: '',
		name: '',
		title: '',
	},
	ein: '',
	ssn: '',
	userAgent: '',
};
const initialStateAuth: Auth = {
	id: 0,
	username: '',
	email: '',
	firstName: '',
	lastName: '',
	gender: '',
	image: '',
	token: '',
};
const initialStateUsersObject: UsersObject = {
	users: [],
	total: 0,
	skip: 0,
	limit: 0,
};
const initialState: UsersState = {
	usersObject: initialStateUsersObject,
	auth: initialStateAuth,
	currUser: initialStateUser,
};

export const loadUsers = createAsyncThunk('users/loadUsers', () => api.getAllUsers());
export const loadAuth = createAsyncThunk(
	'users/loadAuth',
	(input: { username: string; password: string }) => api.getAuth(input.username, input.password)
);
export const loadUser = createAsyncThunk('users/loadUser', (id: number) => api.getUser(id));

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		edit: (state, action: PayloadAction<User>) => {
			state.currUser = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadUser.fulfilled, (state, action) => {
				state.currUser = action.payload;
			})
			.addCase(loadAuth.fulfilled, (state, action) => {
				state.auth = action.payload;
			})
			.addCase(loadUsers.fulfilled, (state, action) => {
				state.usersObject = action.payload;
			});
	},
});

export default usersSlice.reducer;
export const { edit } = usersSlice.actions;
