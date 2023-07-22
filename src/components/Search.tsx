import { useState, useEffect, ChangeEvent } from "react";
import { PokemonData, PokemonType } from "./types/types";
import { Link, useLoaderData } from "react-router-dom";
import upperCaseFirstChar from "../utils/upperCase";

import '../../public/css/search.css';
import pokeball from '../assets/Poké_Ball_icon.svg';

type SearchDivProps = {
    pokemons: PokemonData
}

type PropsType = {
    pokemons: PokemonData,
    searchQuery: string,
    signal?: AbortSignal
}

function PokemonList({pokemons, searchQuery}: PropsType) {
    const [pokemonArray, setPokemonArray] = useState<PokemonType[]>();
    
    useEffect(() => {
        let arrayOfFuffiledPokemonObjects = Promise.all(pokemons.results.filter((value, index) => {
            if (searchQuery.length < 3) return index < 20;
            else return value.name.includes(searchQuery.toLowerCase())
        })
        .map(async pokemon => {
            const pokemonObject = await (await fetch(`${pokemon.url}`)).json() as PokemonType;
    
            return pokemonObject
        }))

        arrayOfFuffiledPokemonObjects.then(fuffiledPokemon => {
            setPokemonArray(fuffiledPokemon)
        })
    }, [searchQuery])
    
    return (
            <>
                {
                    pokemonArray?.map(pokemon => {
                        return <div key={pokemon.name} className="search-link-div">
                            <img src={pokemon.sprites.front_default} style={{visibility: (!pokemon.sprites.front_default ? 'hidden' : 'visible')}} width="56" height="56"/>
                            <Link to={`pokemon/${pokemon.name}`} style={{ display: "block" }}>{upperCaseFirstChar(pokemon.name)}</Link>
                        </div>
                    })
                }
            </>
    )
}

function SearchDiv({pokemons}: SearchDivProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
    const [isShowingSidebar, setIsShowingSidebar] = useState((window.innerWidth > 800 ? true : false));

    function initLiveSearch(e: ChangeEvent<HTMLInputElement>) {
        setDebouncedQuery(e.target.value)
    }

    useEffect(() => {
        const timer = setTimeout(() => setSearchQuery(debouncedQuery), 1000)

        return () => clearTimeout(timer)
    }, [debouncedQuery])

    function toggleSidebar() {
        setIsShowingSidebar(!isShowingSidebar);
    }

    return (
        <>
            {isShowingSidebar ?
                <section>
                    <div id="search-div">
                        <div id="search-div-child1">
                            <input id="search-input" type="text" onChange={initLiveSearch} placeholder="Search" />
                            <img id="pokelogo" src={pokeball} onClick={toggleSidebar} width={35} />
                        </div>
                        <div id="pokemon-list">
                            <PokemonList pokemons={pokemons} searchQuery={searchQuery} />
                        </div>
                    </div>
                </section>
                :
                <img id="pokelogo" style={{position: "absolute", left: "20px", top: "30px", zIndex: "1"}} src={pokeball} onClick={toggleSidebar} width={35} />
            }
        </>
    )   
}

export default function Search() {
    let pokemons = useLoaderData() as PokemonData;

    return (
        <>
            <SearchDiv pokemons={pokemons} />  
        </>
    )
}