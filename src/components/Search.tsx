import { useState } from "react";
import { PokemonData } from "./types/types";
import { Link, useLoaderData } from "react-router-dom";

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');

    let pokemons = useLoaderData() as PokemonData;

    return (
        <>
            <section>
                <div>
                    <input type="text" onChange={e => setSearchQuery(e.target.value)} placeholder="search for a pokemon" />
                    <button type="submit">search</button>
                </div>
                <div>
                    {
                        pokemons.results.filter((value, index) => {
                            if(searchQuery.length < 3) {
                                return index < 10;
                            }
                            return value.name.includes(searchQuery);
                        })
                        .map(pokemon => <Link key={pokemon.name} to={`pokemon/${pokemon.name}`} style={{display: "block"}}>{pokemon.name}</Link>)
                    }
                </div>
            </section>
        </>
    )
}