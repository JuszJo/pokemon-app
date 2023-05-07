import { useLoaderData } from 'react-router-dom';
import { PokemonType } from './Home';

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