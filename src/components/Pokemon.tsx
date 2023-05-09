import '../../public/css/pokemon.css';

import { useLoaderData } from 'react-router-dom';
import { PokemonType } from './types/types';
import { useState } from 'react';

interface PropsType {
    pokemon: PokemonType,
}

function PokemonImage({ pokemon }: PropsType) {
    const [loaded, setLoaded] = useState(false);

    function showStats() {
        setLoaded(true)
    }

    return (
        <>
            <div id='pokemon-image-div'>
                <img onLoad={showStats} src={pokemon.sprites.front_default} />
            </div>
            {loaded && <Stats pokemon={pokemon} />}
        </>
    )
}

function Stats({ pokemon }: PropsType) {
    return (
        <>
            <div id='grid'>
                {pokemon.stats.map(value => {
                    return (
                        <div key={value.stat.name} className='stats-div'>
                            <div>
                                <h3>{value.stat.name}</h3>
                            </div>
                            <div>
                                <h3>{value.base_stat}</h3>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default function Pokemon() {
    const pokemon = useLoaderData() as PokemonType;

    return (
        <>
            <div id='about-pokemon'>
                <h1 id='pokemon-name'>{pokemon.name}</h1>
                <PokemonImage key={pokemon.name} pokemon={pokemon} />
            </div>
        </>
    )
}