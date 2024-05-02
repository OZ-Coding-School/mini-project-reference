import React, { useEffect, useRef, useState } from "react";

import "./App.css";
import { MovieList } from "./MovieList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieDetailPage from "./components/MoviePage/MovieDetailPage";
import NavBar from "./components/NavBar/NavBar";
import SearchPage from "./components/SearchPage/SearchPage";

function App() {
  const [navBarHeight, setNavBarHeight] = useState(0);

  useEffect(() => {
    const navBar = document.querySelector(".navbar-container");
    if (navBar) {
      setNavBarHeight(navBar.offsetHeight);
    }
  }, []);

  return (
    <Router>
      <div className="main" style={{ paddingTop: navBarHeight }}>
        <NavBar />

        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/search/:query" element={<SearchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
