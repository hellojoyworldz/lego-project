import "./App.css";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  const increment = () => {
    dispatch({ type: "INCREASE", playload: { num: 1 } });
  };
  const decrement = () => {
    dispatch({ type: "DECREASE", playload: { num: 1 } });
  };
  return (
    <div className="App">
      <h1>Counter</h1>
      <div className="count">{count}</div>
      <div>
        <button className="button" type="button" onClick={increment}>
          +
        </button>
        <button className="button" type="button" onClick={decrement}>
          -
        </button>
      </div>
    </div>
  );
}

export default App;
