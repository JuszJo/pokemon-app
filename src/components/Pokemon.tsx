import '../../public/css/pokemon.css';

import { useLoaderData } from 'react-router-dom';
import { PokemonType } from './types/types';

interface PropsType {
    pokemon: PokemonType,
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
                <div id='pokemon-image-div'>
                    <img src={pokemon.sprites.front_default} />
                </div>
                <Stats pokemon={pokemon} />
            </div>
        </>
    )
}