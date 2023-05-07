import { useLoaderData, Link, Outlet } from "react-router-dom";

export interface PokemonType {
    name: string,
    url: string,
    sprites: {
        front_default: string,
        back_default: string,
    },
}

export interface PokemonData {
    results: Array<PokemonType>,
}

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