import * as React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import loadable from '@loadable/component';

const Home = loadable(() => import('./pages/Home'), {
  resolveComponent: (components) => components.Home,
});

const About = loadable(() => import('./pages/About'), {
  resolveComponent: (components) => components.About,
});

const App = () => {
  return (
    <>
      <h1>React Router</h1>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

const NoMatch = () => {
  return <p>There's nothing here: 404!</p>;
};

export default App;
