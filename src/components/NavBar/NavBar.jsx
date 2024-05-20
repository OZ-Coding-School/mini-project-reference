import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes, faBars } from "@fortawesome/free-solid-svg-icons";
import ToggleThemeButton from "../../style/ToggleThemeButton";
import SearchResults from "../SearchResults/SearchResults";
import Sidebar from "./Sidebar"; // Ensure this matches the file name

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
`;

const NavBarContainer = styled.div`
  position: relative;
  background-color: rgba(25, 25, 25, 0.99);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0.8rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoContainer = styled.a`
  width: 8rem;
  cursor: pointer;

  @media (max-width: 767px) {
    width: 5rem;
  }
`;

const ActionBar = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (max-width: 576px) {
    gap: 0;
    flex-grow: 1;
    justify-content: flex-end;
  }
`;

const SearchForm = styled.form`
  display: ${({ $isSearchActive }) => ($isSearchActive ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  background-color: rgba(25, 25, 25, 0.99);
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  padding: 2rem 10rem;
  z-index: 1001;

  @media (max-width: 992px) {
    padding-left: 5rem;
    padding-right: 5rem;
  }

  @media (max-width: 576px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  padding: 2rem 0 1em;
  border-bottom: 2px solid #fff;

  @media (max-width: 576px) {
    padding: 1rem 0;
  }
`;

const SearchInput = styled.input`
  padding-right: 3rem;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  border-width: 0px;
  background: transparent;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: normal;

  @media (max-width: 576px) {
    padding-right: 1rem;
    font-size: 1rem;
  }
`;

const SubmitSearchButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 1rem;
  background: transparent;
  cursor: pointer;
  color: #fff;
  font-size: 1.5rem;
  width: 2rem;

  @media (max-width: 576px) {
    font-size: 1rem;
  }
`;

const ToggleSearchButton = styled.button`
  width: 2rem;
  font-size: 1.3rem;
  color: gray;
  border: none;
  background: none;

  cursor: pointer;

  &:hover {
    color: #fff;
  }

  @media (max-width: 576px) {
    margin-right: 2rem;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 10px;
  white-space: nowrap;

  @media (max-width: 576px) {
    display: none;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #7000ff;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;

  &:hover {
    background-color: #25282b;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  font-size: 1.3rem;
  color: gray;
  border: none;
  background: none;
  cursor: pointer;
  position: absolute;
  top: 1.1rem;
  right: 1.5rem;
  z-index: 1002;

  &:hover {
    color: #fff;
  }

  @media (max-width: 576px) {
    display: block;
  }
`;

export default function NavBar() {
  const [search, setSearch] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchContainerRef = useRef(null);

  const closeSearch = () => {
    setIsSearchActive(false);
    setSearch("");
  };

  const handleSetSearch = (event) => {
    setSearch(event.target.value);
  };

  const toggleSearch = () => {
    if (isSearchActive) {
      closeSearch();
    }
    setIsSearchActive(!isSearchActive);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search/${encodeURIComponent(search)}`);
    closeSearch();
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        if (isSearchActive) {
          closeSearch();
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchActive]);

  useEffect(() => {
    closeSearch();
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <Header ref={searchContainerRef} className="navbar-container">
      <NavBarContainer>
        <LogoContainer href="/">
          <img src="/images/oz_movie-logo.png" alt="OZ Movie Logo" />
        </LogoContainer>
        <ActionBar>
          <ToggleThemeButton />
          <AuthButtons>
            <Button className="login-button">로그인</Button>
            <Button className="signup-button">회원가입</Button>
          </AuthButtons>
          <ToggleSearchButton onClick={toggleSearch}>
            <FontAwesomeIcon icon={isSearchActive ? faTimes : faSearch} />
          </ToggleSearchButton>
          <HamburgerButton onClick={toggleMenu}>
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </HamburgerButton>
        </ActionBar>
      </NavBarContainer>
      <Sidebar isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
      <SearchForm $isSearchActive={isSearchActive} onSubmit={handleSubmit}>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="영화 제목을 입력해보세요."
            value={search}
            onChange={handleSetSearch}
          />
          <SubmitSearchButton type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </SubmitSearchButton>
        </SearchContainer>
        {isSearchActive && <SearchResults search={search} />}
      </SearchForm>
    </Header>
  );
}
