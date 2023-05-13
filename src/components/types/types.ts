interface PokemonStats {
    base_stat: number,
    effort: number,
    stat: {
        name: string,
        url: string
    }
}

interface Type {
    type: {
        name: string,
        url: string
    }
}

export interface PokemonType {
    name: string,
    url: string,
    sprites: {
        front_default: string,
        back_default: string,
        other: {
            "official-artwork": {
                front_default: string
            }
        }
    },
    species: {
        name: string,
        url: string
    }
    stats: Array<PokemonStats>,
    types: Array<Type>
    
}

export interface PokemonSpecies {
    color: {
        name: string,
    }
}

export interface PokemonData {
    results: Array<PokemonType>,
}