import { useLoaderData } from 'react-router-dom';
import { PokemonSpecies, PokemonType } from './types/types';
import { useRef, useState } from 'react';

import '../../public/css/pokemon.css';

import pokemonLogo from '../assets/International_Pokémon_logo.svg';
// import preLoader from '../assets/Double Ring-1s-200px.gif';

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
                            <div id='stats-name'>
                                <h3>{value.stat.name.charAt(0).toUpperCase() + value.stat.name.slice(1)}</h3>
                            </div>
                            <div id='stats-value'>
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
            {/* {!loaded && <img src={preLoader} className='preLoader' />} */}
            <div id='pokemon-image-div'>
                <img ref={imageRef} width={400} className='pokemonImage' onLoad={showStats} src={pokemon.sprites.other['official-artwork'].front_default} />
            </div>
            {/* {loaded && <Stats pokemon={pokemon} />} */}
        </>
    )
}

function PokemonDiv({pokemon}: PropsType) {
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
                        <h1 id='pokemon-name' className={`type-color-${pokemon.types[0].type.name}`}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
                    </div>
                </section>
                <section id='main-pokemon'>
                    <div id='main-pokemon-flex'>
                        <div className='main-pokemon-flex-child'>
                            <PokemonImage key={pokemon.name} pokemon={pokemon} />
                        </div>
                        <div className='main-pokemon-flex-child'>
                            <Stats pokemon={pokemon} />
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
            
    return <PokemonDiv pokemon={pokemon} />
}