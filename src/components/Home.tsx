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

export const rootLoader = async (): Promise<PokemonData> => {
    const data = fetch('https://pokeapi.co/api/v2/pokemon');

    if(!(await data).ok) throw new Error("Something Went Wrong");

    const pokemons = (await data).json();

    return pokemons;
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