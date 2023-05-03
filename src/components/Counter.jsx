import { useDispatch, useSelector } from "react-redux"
import { incr, decr } from "../store/counterReducer"

const Counter = () => {
    const counter = useSelector(state => state.counter.value)
    const dispatch = useDispatch()

    return (
        <div>  
            Counter: {counter}
            <button onClick={e => dispatch(incr())}>+</button>
            <button onClick={e => dispatch(decr())}>-</button>
        </div>
    )
}
export default Counter