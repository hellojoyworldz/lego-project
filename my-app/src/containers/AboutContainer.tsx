import type { FC } from 'react';
import { Link } from 'react-router-dom';

const AboutContainer: FC = () => (
  <div>
    <h2>About Page</h2>
    <p>This is the about page.</p>
    <Link to="/" state={{ animation: 'back' }}>
      Go Home
    </Link>
  </div>
);

export default AboutContainer;
