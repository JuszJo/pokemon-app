import { LoaderFunctionArgs } from "react-router-dom";
import { PokemonType, PokemonSpecies } from "../components/types/types";

interface PropsType {
    pokemon: PokemonType
}

const colorLoader = async ({pokemon}: PropsType): Promise<PokemonSpecies> => {
    const data = await fetch(`${pokemon.species.url}`);
    
    if(!data.ok) throw new Error("Something Went Wrong");
    
    const pokemonSpecies = await data.json();
    
    return pokemonSpecies;
}

export const pokemonLoader = async ({params}: LoaderFunctionArgs): Promise<[PokemonType, PokemonSpecies]> => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
    
    if(!data.ok) throw new Error("Something Went Wrong");
    
    const pokemon = await data.json();
    
    const pokemonSpecies = await colorLoader({pokemon});

    return [pokemon, pokemonSpecies];
}