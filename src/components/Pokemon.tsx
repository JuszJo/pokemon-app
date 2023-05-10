import { useLoaderData } from 'react-router-dom';
import { PokemonType } from './types/types';
import { useRef, useState } from 'react';

import '../../public/css/pokemon.css';

import preLoader from '../assets/Double Ring-1s-200px.gif';

interface PropsType {
    pokemon: PokemonType,
}

function PokemonImage({ pokemon }: PropsType) {
    const [loaded, setLoaded] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);

    if(loaded) imageRef.current?.classList.add('visible');

    function showStats() {
        setLoaded(true)
    }

    return (
        <>
            {!loaded && <img src={preLoader} className='preLoader' />}
            <div id='pokemon-image-div'>
                <img ref={imageRef} className='pokemonImage' onLoad={showStats} src={pokemon.sprites.other['official-artwork'].front_default} />
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