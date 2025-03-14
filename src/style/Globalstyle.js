import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Importation des polices Google */
  @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@400;700&family=Inter:wght@400;500;700&family=Space+Grotesk:wght@300;400;500&display=swap');

  /* Définir les polices globales */
  body {
    font-family: 'Inter', sans-serif;  /* Polices principales */
    font-weight:400;
  }

  @font-face {
  font-family: 'velista';
  src: url('/fonts/velista.ttf') format('truetype');
 
}
   @font-face {
  font-family: 'SankofaDisplay';
  src: url('/fonts/SankofaDisplay.ttf') format('truetype');
 
}




  h1{
    font-family: 'Bodoni Moda', serif;  /* Utilisation de Bodoni pour les titres */
  }

  p{
    font-family: 'space grotesk', sans-serif; 
    font-weight: 400;
    font-size: 1.125rem;
    text-align: center;
   }

  h2{
   font-family: 'SankofaDisplay', serif;
   font-size: 2.5rem;
  }

  h3{
   font-size: 2rem;

  }
`;

export default GlobalStyle;