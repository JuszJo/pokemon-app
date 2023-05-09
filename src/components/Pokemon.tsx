import { useLoaderData } from 'react-router-dom';
import { PokemonType } from './types/types';

export default function Pokemon() {
    const pokemon = useLoaderData() as PokemonType;

    console.log(pokemon);

    return (
        <>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.sprites.front_default} />
            <img src={pokemon.sprites.back_default} />
        </>
    )
}