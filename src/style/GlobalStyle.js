import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }

  .slider {
    padding: 0 4%;

    @media (min-width: 1200px) {
      padding: 0 60px;

    }
  }

  .wrap {
    max-width: 65rem;
  }

  img {
    width: 100%;
    object-fit: cover;
  }
`;

export default GlobalStyle;
