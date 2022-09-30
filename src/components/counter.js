import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, resetCounter, incrementByAmount } from "../store/slice/counterSlice";

const Counter = () => {
    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();

    const [incrementAmount, setIncrementAmount] = useState(0);
    const addValue = Number(incrementAmount) || 0;

    const resetAll = () => {
        setIncrementAmount(0)
        dispatch(resetCounter());
    }

    return (
        <div>
            <button onClick={() => dispatch(increment())}>+</button>
            <p>{count}</p>
            <button onClick={() => dispatch(decrement())}>-</button>
            <div className="more-options">
                <button onClick={resetAll}>Reset</button>
                <input type="text" value={incrementAmount} onChange={(e) => setIncrementAmount(e.target.value)} />
                <button onClick={() => dispatch(incrementByAmount(addValue))}>Increment By Amount</button>
            </div>
        </div>
    )
}

export default Counter