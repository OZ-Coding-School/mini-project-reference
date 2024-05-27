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
import Signup from "./components/LogIn/Signup";
import Login from "./components/LogIn/Login";
import { AuthProvider } from "./components/LogIn/AuthContext";
import MyPage from "./components/Mypage/MypageComponent";
import { BookmarkProvider } from "./contexts/BookmarkContext";

const MainContainer = styled.div`
  padding-top: ${(props) => props.$paddingTop}px;
`;

function App() {
  const [navBarHeight, setNavBarHeight] = useState(0);

  return (
    <NavBarProvider>
      <AuthProvider>
        <NavBarProvider>
          <Router>
            <CustomThemeProvider>
              <GlobalStyle />
              <NavBar setNavBarHeight={setNavBarHeight} />

              <MainContainer $paddingTop={navBarHeight}>
                <Routes>
                  <Route path="/" element={<MovieList />} />
                  <Route path="/movie/:id" element={<MovieDetailPage />} />
                  <Route path="/search/:query" element={<SearchPage />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/mypage" element={<MyPage />} />
                </Routes>
              </MainContainer>
            </CustomThemeProvider>
          </Router>
        </NavBarProvider>
      </AuthProvider>
    </NavBarProvider>
  );
}

export default App;
