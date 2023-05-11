import { useState, useEffect } from "react";
import { PokemonData, PokemonType } from "./types/types";
import { Link, useLoaderData } from "react-router-dom";

import '../../public/css/search.css';

type PropsType = {
    pokemons: PokemonData,
    searchQuery: string
}

function PokemonList({pokemons, searchQuery}: PropsType) {
    const [pokemonObject, setPokemonObject] = useState<PokemonType[]>();

    useEffect(() => {
        Promise.all(pokemons.results.filter((value, index) => {
            if (searchQuery.length < 3) {
                return index < 10;
            }
            return value.name.includes(searchQuery.toLowerCase());
        })
        .map(async pokemon => {
            const pokemonObject = await (await fetch(`${pokemon.url}`)).json() as PokemonType;
    
            return pokemonObject;
        }))
        .then(value => setPokemonObject(value))
    }, [searchQuery])


    return (
        <>
            {
                pokemonObject?.map(pokemon => {
                    return <div key={pokemon.name} className="search-link-div">
                        <img src={pokemon.sprites.front_default} style={{visibility: (!pokemon.sprites.front_default ? 'hidden' : 'visible')}} width="56" height="56"/>
                        <Link to={`pokemon/${pokemon.name}`} style={{ display: "block" }}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Link>
                    </div>
                })
            }
        </>
    )
}

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');

    let pokemons = useLoaderData() as PokemonData;

    return (
        <>
            <section>
                <div id="search-div">
                    <div>
                        <input type="text" onChange={e => setSearchQuery(e.target.value)} placeholder="search for a pokemon" />
                        <button type="submit">search</button>
                    </div>
                    <div id="pokemon-list">
                        <PokemonList pokemons={pokemons} searchQuery={searchQuery} />
                    </div>
                </div>
            </section>
        </>
    )
}