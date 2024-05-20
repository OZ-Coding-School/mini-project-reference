import React from "react";
import { useTheme } from "./ThemeContext";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const StyledButton = styled.button`
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 1rem;
`;

const Icon = styled(FontAwesomeIcon)`
  color: ${({ theme, $iconTheme }) =>
    $iconTheme === "light" ? theme.iconLight : theme.iconDark};
`;

const ToggleThemeButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <StyledButton onClick={toggleTheme}>
      <Icon icon={theme === "light" ? faMoon : faSun} $iconTheme={theme} />
    </StyledButton>
  );
};

export default ToggleThemeButton;
