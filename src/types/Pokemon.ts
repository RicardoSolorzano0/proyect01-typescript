export interface Pokemon {
    species: {
        name: string;
    };
    sprites: {
        front_shiny: string;
    };
}


// {data.species.name} {isFetching ? '...' : ''}
// </h3>

// <img
//     alt={ data.species.name }
//     src={ data.sprites.front_shiny }>