import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Home from './components/Home';
import { rootLoader } from './loaders/rootLoader';
import Pokemon from './components/Pokemon';
import { pokemonLoader } from './loaders/pokemonLoader';
import './App.css';

const router2 = createBrowserRouter(
    createRoutesFromElements([
        <Route element={<Home />} loader={rootLoader} path='/' >
            <Route element={<Pokemon />} loader={pokemonLoader} path='pokemon/:name'/>
        </Route>
    ]
))

function App() {
    return <RouterProvider router={router2} />
}

export default App
