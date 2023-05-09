import { PokemonData } from "../components/types/types";

export const rootLoader = async (): Promise<PokemonData> => {
    const data = await fetch('https://pokeapi.co/api/v2/pokemon');

    if(!data.ok) throw new Error("Something Went Wrong");

    const pokemons = await data.json();

    return pokemons;
}