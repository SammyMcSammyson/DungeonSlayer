//either use API or own data
//I am leaning towards my own data but have an idea on where to use an API

// import { useEffect } from 'react';
import Header from './Components/Header';
import Intro from './Components/Intro';
import Gold from './Components/Gold';

export default function App() {
  return (
    <>
      <Header />
      <Intro />
      <Gold />
      {/* we need to render our upgrades shop in here using map  */}
      {/* we need to render the counter and perseconds */}
    </>
  );
}
