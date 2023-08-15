import Game from './types/Game';
import GameInfo from './types/GameInfo';

const optionsToFetch = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
	},
};

export async function getGamesByParams(path: string): Promise<Game[]> {
	const res = await fetch(
		`https://free-to-play-games-database.p.rapidapi.com/api/${path}`,
		optionsToFetch
	);
	return res.json();
}

export async function getGameById(id: number): Promise<GameInfo> {
	const res = await fetch(
		`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
		optionsToFetch
	);
	return res.json();
}
