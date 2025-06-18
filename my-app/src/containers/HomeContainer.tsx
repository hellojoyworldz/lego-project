import type { FC } from 'react';
import Hello from '../components/Hello';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';


const HomeContainer: FC = () => {
  const count = useStore((state) => state.count);
  const increase = useStore((state) => state.increase);

  return (
    <div>
      <Hello />
      <p>count: {count}</p>
      <button onClick={increase}>+</button>
      <div>
        <Link to="/about">Go to About</Link>
      </div>
    </div>
  );
};

export default HomeContainer;
