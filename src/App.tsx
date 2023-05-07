import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Home, { rootLoader } from './components/Home';
import Pokemon, { pokemonLoader } from './components/Pokemon';
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
