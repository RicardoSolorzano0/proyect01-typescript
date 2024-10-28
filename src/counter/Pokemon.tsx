import { useGetPokemonByNameQuery } from './services/pokemon'

interface Props {
  name?: string
}

export const Pokemon = ({
  name
}:Props) => {
  const { data, error, isLoading, isFetching } = useGetPokemonByNameQuery(
    name!,
    {
      skip: name !== undefined
    }
  )

  const loading = isLoading || isFetching;

  // const [getPokemon, { data, error, isLoading, isFetching }] = useLazyGetPokemonByNameQuery();

  // useEffect(() => {
  //   getPokemon(name)
  // }, [name]);

  return (
    <>
      {error ? (
        <>Oh no, there was an error</>
      ) : loading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>
            {data.species.name} {isFetching ? '...' : ''}
          </h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
        </>
      ) : null}
    </>
  )
}
