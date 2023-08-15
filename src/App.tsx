import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layout/Layout/Layout';
import Home from './layout/Home/Home';
import Games from './features/games/components/Games';
import GameInfo from './features/games/components/GameInfo';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="games" element={<Games />}>
					<Route path=":gameId" element={<GameInfo />}></Route>
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
