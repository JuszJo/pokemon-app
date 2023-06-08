import { useState, useEffect, ChangeEvent } from "react";
import { PokemonData, PokemonType } from "./types/types";
import { Link, useLoaderData } from "react-router-dom";

import '../../public/css/search.css';
import pokeball from '../assets/Poké_Ball_icon.svg';

type PropsType = {
    pokemons: PokemonData,
    searchQuery: string,
    signal?: AbortSignal
}

function PokemonList({pokemons, searchQuery, signal}: PropsType) {
    const [pokemonObject, setPokemonObject] = useState<PokemonType[]>();

    let arrayOfFuffiledPokemonObjects = Promise.all(pokemons.results.filter((value, index) => {
        if (searchQuery.length < 3) return index < 10;
        
        return value.name.includes(searchQuery.toLowerCase());
    })
    .map(async pokemon => {
        const pokemonObject = await (await fetch(`${pokemon.url}`, {signal})).json() as PokemonType;

        return pokemonObject;
    }))

    useEffect(() => {
        arrayOfFuffiledPokemonObjects.then(fuffiledPokemon => setPokemonObject(fuffiledPokemon))
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
    const [isShowingSidebar, setIsShowingSidebar] = useState((window.innerWidth > 800 ? true : false));

    let pokemons = useLoaderData() as PokemonData;

    const controller = new AbortController();
    const signal = controller.signal;
    
    function limitFetch(e: ChangeEvent<HTMLInputElement>) {
        if(e.target.value.length > 2) {
            controller.abort();

            setSearchQuery(e.target.value)
        }
        else setSearchQuery('');
    }

    function toggleSidebar() {
        setIsShowingSidebar(!isShowingSidebar);
    }

    return (
        <>
            {isShowingSidebar ? 
                <section>
                    <div id="search-div">
                        <div id="search-div-child1">
                            <input id="search-input" type="text" onChange={limitFetch} placeholder="Search" />
                            <img id="pokelogo" src={pokeball} onClick={toggleSidebar} width={35} />
                        </div>
                        <div id="pokemon-list">
                            <PokemonList pokemons={pokemons} searchQuery={searchQuery} signal={signal} />
                        </div>
                    </div>
                </section>
                :
                <img id="pokelogo" style={{position: "absolute", left: "20px", top: "30px", zIndex: "1"}} src={pokeball} onClick={toggleSidebar} width={35} />
            }
        </>
    )
}