import { LoaderFunctionArgs } from "react-router-dom";
import { PokemonType } from "../components/types/types";

export const pokemonLoader = async ({params}: LoaderFunctionArgs): Promise<PokemonType> => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);

    if(!data.ok) throw new Error("Something Went Wrong");

    const pokemon = await data.json();

    return pokemon;
}