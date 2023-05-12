import { useLoaderData } from 'react-router-dom';
import { PokemonSpecies, PokemonType } from './types/types';
import { useRef, useState } from 'react';

import '../../public/css/pokemon.css';

import preLoader from '../assets/Double Ring-1s-200px.gif';

interface PropsType {
    pokemon: PokemonType,
    pokemonSpecies?: PokemonSpecies
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
                <img ref={imageRef} width={300} className='pokemonImage' onLoad={showStats} src={pokemon.sprites.other['official-artwork'].front_default} />
            </div>
            {loaded && <Stats pokemon={pokemon} />}
        </>
    )
}

function PokemonDiv({pokemon, pokemonSpecies}: PropsType) {
    return (
        <>
            <div id='about-pokemon' style={{backgroundImage: `linear-gradient(to top, black -90%, ${pokemonSpecies?.color.name})`}}>
                <h1 id='pokemon-name'>{pokemon.name}</h1>
                <PokemonImage key={pokemon.name} pokemon={pokemon} />
            </div>
        </>
    )
}

export default function Pokemon() {
    const [pokemon, pokemonSpecies] = useLoaderData() as [PokemonType, PokemonSpecies];
        
    return <PokemonDiv pokemon={pokemon} pokemonSpecies={pokemonSpecies} />
}