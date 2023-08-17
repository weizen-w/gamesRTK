import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import { selectAuth } from './features/users/selectors';
import Layout from './layout/Layout/Layout';
import Home from './layout/Home/Home';
import Games from './features/games/components/Games';
import GameInfo from './features/games/components/GameInfo';
// import Users from './features/users/components/Users';
import Auth from './features/users/components/Auth';
import Profil from './features/users/components/Profil';

function App() {
	const auth = useAppSelector(selectAuth);

	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="games" element={<Games />}>
					<Route path=":gameId" element={<GameInfo />}></Route>
				</Route>
				{auth?.id ? (
					<>
						{/* <Route path="users" element={<Users />} /> */}
						<Route path="profil" element={<Profil />} />
					</>
				) : (
					<>
						{/* <Route path="users" element={<Auth />} /> */}
						<Route path="profil" element={<Auth />} />
					</>
				)}
				<Route path="auth" element={<Auth />} />
			</Route>
		</Routes>
	);
}

export default App;
