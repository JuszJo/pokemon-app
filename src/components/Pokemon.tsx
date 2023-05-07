import {  useLoaderData, LoaderFunctionArgs }  from 'react-router-dom';
import { PokemonType } from './Home';

export const pokemonLoader = async ({params}: LoaderFunctionArgs): Promise<PokemonType> => {
    const data = fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);

    if(!(await data).ok) throw new Error("Something Went Wrong");

    const pokemon = (await data).json();

    return pokemon;
}


export default function Pokemon() {
    const pokemon = useLoaderData() as PokemonType;

    return (
        <>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.sprites.front_default} />
            <img src={pokemon.sprites.back_default} />
        </>
    )
}