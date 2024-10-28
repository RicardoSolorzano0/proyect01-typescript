//import type { RootState } from './store'
//import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementByAmount } from '../store/slices/counterSlice'
import { Button } from 'antd'
import { useAppDispatch, useAppSelector } from '../hooks'
import { Pokemon } from './Pokemon'

const pokemon = ['bulbasaur', 'pikachu', 'ditto', 'bulbasaur']

export function ExampleRedux() {
  //const count = useSelector((state: RootState) => state.counter.value)
  //const dispatch = useDispatch()
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div>
      <h1>Counter</h1>
      <div className='flex gap-3'>
        <Button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </Button>
        <span>{count}</span>
        <Button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </Button>
        <Button
          aria-label="Decrement value"
          onClick={() => dispatch(incrementByAmount(5))}
        >
          Increment 5
        </Button>
      </div>
      <h2>Pokemon</h2>
      {pokemon.map((poke, index) => (
          <Pokemon key={index} name={poke} />
        ))}
    </div>
  )
}