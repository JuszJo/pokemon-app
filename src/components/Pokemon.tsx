import { useLoaderData } from 'react-router-dom';
import { PokemonSpecies, PokemonType } from './types/types';
import { useRef, useState } from 'react';

import '../../public/css/pokemon.css';

import pokemonLogo from '../assets/International_Pokémon_logo.svg';
import preLoader from '../assets/Poké_Ball_icon.svg';

interface PropsType {
    pokemon: PokemonType,
    pokemonSpecies?: PokemonSpecies,
    setLoaded?: any
}

function Stats({ pokemon }: PropsType) {
    return (
        <>
            <div id='grid'>
                {pokemon.stats.map(value => {
                    return (
                        <div key={value.stat.name} className='stats-div'>
                            <div className='stats-name'>
                                <h3>{value.stat.name.charAt(0).toUpperCase() + value.stat.name.slice(1)}</h3>
                            </div>
                            <div className='stats-value'>
                                <h3>{value.base_stat}</h3>
                            </div>
                            <div className='stats-bar'>
                                <div className={`type-${pokemon.types[0].type.name}`} style={{width: `${(value.base_stat / 200) * 100}%`}}></div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

function PokemonImage({ pokemon, setLoaded }: PropsType) {
    const imageRef = useRef<HTMLImageElement>(null);

    function showStats() {
        setLoaded(true);

        imageRef.current?.classList.add('visible');
    }

    return (
        <>
            <div id='pokemon-image-div'>
                <img ref={imageRef} width={400} className='pokemonImage' onLoad={showStats} src={pokemon.sprites.other['official-artwork'].front_default} />
            </div>
        </>
    )
}

function PokemonDiv({pokemon}: PropsType) {
    const [loaded, setLoaded] = useState(false);
    
    return (
        <>
            <div id='about-pokemon'>
                <section>
                    <div style={{textAlign: 'center'}}>
                        <img width={200} src={pokemonLogo} />
                    </div>
                </section>
                <section>
                    <div>
                        {loaded && <h1 id='pokemon-name' className={`type-color-${pokemon.types[0].type.name}`}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>}
                    </div>
                </section>
                <section id='main-pokemon'>
                    <div id='main-pokemon-flex'>
                        <div className='main-pokemon-flex-child'>
                            {!loaded && <img src={preLoader} className='preLoader' />}
                            <PokemonImage pokemon={pokemon} setLoaded={setLoaded} />
                        </div>
                        <div className='main-pokemon-flex-child'>
                            {loaded && <Stats pokemon={pokemon} />}
                        </div>
                    </div>
                </section>
                <section>
                    <div id='types-div'>
                        {pokemon.types.map(pokemonTypes => {
                            return (
                                <span key={pokemonTypes.type.name} className={`type-${pokemonTypes.type.name}`}>
                                    {pokemonTypes.type.name.charAt(0).toUpperCase() + pokemonTypes.type.name.slice(1)}
                                </span>
                            )
                        })}
                    </div>
                </section>
            </div>
        </>
    )
}

export default function Pokemon() {
    // const [pokemon, pokemonSpecies] = useLoaderData() as [PokemonType, PokemonSpecies];
    const pokemon = useLoaderData() as PokemonType;
            
    return <PokemonDiv key={pokemon.name} pokemon={pokemon} />
}