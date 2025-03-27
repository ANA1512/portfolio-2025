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
  font-family: 'Cormorant';
  src: url('/fonts/Cormorant.ttf') format('truetype');
 
}

    @font-face {
  font-family: 'Modist';
  src: url('/fonts/Modist.ttf') format('truetype');
 
}

  h1{
   font-family: 'Cormorant';
    font-weight:300;
    font-size: 3rem;
  }

  p{
    font-family: 'space grotesk', sans-serif; 
    font-weight: 400;
    font-size: 1rem;
   
   }

  h2{
   font-family: 'SankofaDisplay', serif;
   font-size: 2.5rem;
  }

  h3{
   font-size: 2rem;

  }
   span{
       font-family: 'Cormorant';
       font-size: 1.5rem;
       text-transform: uppercase;
       font-weight:300;
   }
`;

export default GlobalStyle;