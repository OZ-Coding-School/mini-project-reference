import React, { createContext, useState, useContext } from "react";

const NavBarContext = createContext();

export const useNavBar = () => useContext(NavBarContext);

export const NavBarProvider = ({ children }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  const toggleSearch = () => {
    setIsSearchActive((prev) => !prev);
  };

  const closeSearch = () => {
    setIsSearchActive(false);
  };

  return (
    <NavBarContext.Provider
      value={{ isSearchActive, toggleSearch, closeSearch }}
    >
      {children}
    </NavBarContext.Provider>
  );
};
