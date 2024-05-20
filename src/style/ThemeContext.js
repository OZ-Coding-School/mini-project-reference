import { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const CustomThemeProvider = ({ children }) => {
  // 로컬 스토리지에서 초기 테마 값을 읽어옵니다.
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  useEffect(() => {
    // 테마가 변경될 때마다 로컬 스토리지에 저장합니다.
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={themeMode}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
