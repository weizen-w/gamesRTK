import Game from './types/Game';

const optionsToFetch = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
  }
};
// eslint-disable-next-line import/prefer-default-export
export async function getAll(): Promise<Game[]> {
  const res = await fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', optionsToFetch);
  return res.json();
}
