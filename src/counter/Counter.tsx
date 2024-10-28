//import type { RootState } from './store'
//import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementByAmount } from './counterSlice'
import { Button } from 'antd'
import { useAppDispatch, useAppSelector } from './hooks/hooks'

export function Counter() {
  //const count = useSelector((state: RootState) => state.counter.value)
  //const dispatch = useDispatch()
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div>
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
    </div>
  )
}