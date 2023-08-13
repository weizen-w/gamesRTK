import Game from './types/Game';

const optionsToFetch = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
	},
};

export async function getAllByParams(path: string): Promise<Game[]> {
	const res = await fetch(
		`https://free-to-play-games-database.p.rapidapi.com/api/${path}`,
		optionsToFetch
	);
	return res.json();
}
