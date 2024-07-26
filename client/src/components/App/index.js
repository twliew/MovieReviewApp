import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from '../Landing';
import Search from '../Search';
import AboutMovies from '../AboutMovies';
import Review from '../Review';

const App = () => {
  return (
    <>
      <Router>
        <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/AboutMovies" element={<AboutMovies />} />
          <Route path="/Review" element={<Review />} />
        </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;