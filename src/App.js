import React, { useEffect, useRef, useState } from "react";

import "./App.css";
import { MovieList } from "./MovieList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieDetailPage from "./components/MoviePage/MovieDetailPage";
import NavBar from "./components/NavBar/NavBar";
import SearchPage from "./components/SearchPage/SearchPage";
import styled, { ThemeContext } from "styled-components";
import { CustomThemeProvider } from "./style/ThemeContext";
import GlobalStyle from "./style/GlobalStyle";
import { NavBarProvider } from "./components/NavBar/NavBarContext";

const MainContainer = styled.div`
  padding-top: ${(props) => props.$paddingTop}px;
`;

function App() {
  const [navBarHeight, setNavBarHeight] = useState(0);

  useEffect(() => {
    const navBar = document.querySelector(".navbar-container");
    if (navBar) {
      setNavBarHeight(navBar.offsetHeight);
    }
  }, []);

  return (
    <NavBarProvider>
      <Router>
        <CustomThemeProvider>
          <GlobalStyle />
          <NavBar />
          <MainContainer $paddingTop={navBarHeight}>
            <Routes>
              <Route path="/" element={<MovieList />} />
              <Route path="/movie/:id" element={<MovieDetailPage />} />
              <Route path="/search/:query" element={<SearchPage />} />
            </Routes>
          </MainContainer>
        </CustomThemeProvider>
      </Router>
    </NavBarProvider>
  );
}

export default App;
