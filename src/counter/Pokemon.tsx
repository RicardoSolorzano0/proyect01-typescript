import { useGetPokemonByNameQuery } from '@/api/services/pokemon';

interface Props {
  readonly name?: string;
}

export const Pokemon = ({
    name
}: Props) => {
    const { data, error, isFetching, isLoading } = useGetPokemonByNameQuery(
    name!,
    {
        skip: name === undefined
    }
    );

    const loading = isLoading || isFetching;

    if (error) {
        return (
            <>Oh no, there was an error</>
        );
    }

    if (loading) {
        return (
            <>Loading...</>
        );
    }

    return (
               
        data ? (
            <>
                <h3>
                    {data.species.name}
                </h3>

                <img
                    alt={ data.species.name }
                    src={ data.sprites.front_shiny }
                />
            </>
        ) : <>Not found</>
        
    );
};
