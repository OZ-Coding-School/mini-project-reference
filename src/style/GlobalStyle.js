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

  html {
    font-size: 16px; 

    @media (max-width: 1200px) {
      font-size: 15px; 
    }

    @media (max-width: 992px) {
      font-size: 14px;
    }

    @media (max-width: 576px) {
      font-size: 12px;
    }
  }

`;

export default GlobalStyle;
