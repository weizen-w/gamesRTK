import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layout/Layout/Layout';
import Home from './layout/Home/Home';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
			</Route>
		</Routes>
	);
}

export default App;
