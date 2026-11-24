import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  /* Font Face personnalisées */
  @font-face {
    font-family: 'Velista';
    src: url('/fonts/velista.ttf') format('truetype');
  }

  @font-face {
    font-family: 'SankofaDisplay';
    src: url('/fonts/SankofaDisplay-Regular.ttf') format('truetype');
  }

   @font-face {
    font-family: 'Bubble';
    src: url('/fonts/Bubble.otf') format('truetype');
  }

   @font-face {
    font-family: 'pwgrafitti';
    src: url('/fonts/Wholecar.otf') format('truetype');
  }

  /* Styles globaux */
  body {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 400;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: #fff;
    color: #000;
  }

  p {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.6;
  }

  h2 {
    font-family: 'SankofaDisplay', serif;
    font-size: 2.5rem;
  }

  h3 {
    font-size: 2rem;
    font-weight: 500;
  }
`;

export default GlobalStyle;
