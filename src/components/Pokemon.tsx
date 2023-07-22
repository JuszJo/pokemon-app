import { useLoaderData, useNavigation } from 'react-router-dom';
import { PokemonSpecies, PokemonType } from './types/types';
import { useRef, useState } from 'react';
import upperCaseFirstChar from '../utils/upperCase';

import '../../public/css/pokemon.css';

import pokemonLogo from '../assets/International_Pokémon_logo.svg';
import preLoader from '../assets/Poké_Ball_icon.svg';

import colors from '../utils/pokemonColors';

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
                                <h3>{upperCaseFirstChar(value.stat.name)}</h3>
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
            <div id='pokemon-image-div' style={{backgroundColor: `${colors[pokemon.types[0].type.name as keyof typeof colors]}`}}>
                <img ref={imageRef} width={400} className='pokemonImage' onLoad={showStats} src={pokemon.sprites.other['official-artwork'].front_default} />
            </div>
        </>
    )
}

function PokemonDiv({pokemon}: PropsType) {
    const [loaded, setLoaded] = useState(false);
    const mainRef = useRef<HTMLElement>(null);

    if(loaded) mainRef.current?.classList.add('visible');
    
    return (
        <>
            <div id='about-pokemon'>
                {!loaded && <img src={preLoader} className='preLoader' />}
                <section>
                    <div style={{textAlign: 'center'}}>
                        <img width={200} src={pokemonLogo} />
                    </div>
                </section>
                <section ref={mainRef} id='main-pokemon' className='hidden'>
                    <div id='main-pokemon-flex'>
                        <div className='main-pokemon-flex-child'>
                            <div id='pokemon-top-div'>
                                <div>
                                    <h1 id='pokemon-name' className={`type-color-${pokemon.types[0].type.name}`}>{upperCaseFirstChar(pokemon.name)}</h1>
                                </div>
                                <div id='types-div'>
                                    {pokemon.types.map(pokemonTypes => {
                                        return (
                                            <span key={pokemonTypes.type.name} className={`type-${pokemonTypes.type.name}`}>
                                                {upperCaseFirstChar(pokemonTypes.type.name)}
                                            </span>
                                        )
                                    })}
                                </div>
                            </div>
                            <PokemonImage pokemon={pokemon} setLoaded={setLoaded} />
                        </div>
                        <div className='main-pokemon-flex-child'>
                            <div id='tab-div'>
                                <a>Stats</a>
                                <a>Forms</a>
                                <a>Weaknesses</a>
                            </div>
                            <Stats pokemon={pokemon} />
                        </div>
                    </div>
                </section>
                <section>
                </section>
            </div>
        </>
    )
}

export default function Pokemon() {
    // const [pokemon, pokemonSpecies] = useLoaderData() as [PokemonType, PokemonSpecies];
    const pokemon = useLoaderData() as PokemonType;
    const { state } = useNavigation();

    console.log(state);
    
            
    return <PokemonDiv key={pokemon.name} pokemon={pokemon} />
}