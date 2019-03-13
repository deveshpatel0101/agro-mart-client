import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    This is from home components.
    <Link to='/public/shared?id='>
      public
    </Link>
  </div>
);

export default Home;