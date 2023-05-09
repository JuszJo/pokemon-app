import { useLoaderData, Link, Outlet } from "react-router-dom";
import { PokemonData } from "./types/types";

export default function Home() {
    const pokemons = useLoaderData() as PokemonData;
    
    return (
        <>
            <header>
                {pokemons.results.map(pokemonObject => {
                    return <Link key={pokemonObject.name} style={{margin: "0 5px"}} to={`pokemon/${pokemonObject.name}`}>{pokemonObject.name}</Link>
                })}
            </header>
            <h1>About</h1>
            <Outlet />
        </>
    )
}