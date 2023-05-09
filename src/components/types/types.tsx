export interface PokemonType {
    name: string,
    url: string,
    sprites: {
        front_default: string,
        back_default: string,
    },
}

export interface PokemonData {
    results: Array<PokemonType>,
}