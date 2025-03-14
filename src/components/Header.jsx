import React from 'react'
import GlobalStyle from '../style/Globalstyle'
import styled from 'styled-components';
//import gsap from 'gsap'

//NAME
const Text = styled.span`
      font-size: 3.5rem;
      font-family: 'Velista', serif;
      color:#333230;
      letter-spacing: 2px; 
`
//CREATIVE
const CreaWord = styled.h2`
       font-family: 'SankofaDisplay', serif;
       font-size: 6rem; 
       color:#1F1E1E;
       letter-spacing: 4px; 
     
`
//OCCUPATION
const DevTitle =styled.p`
      font-family: 'Space Grotesk', sans-serif;
      font-size: 2rem;
      color:rgb(153, 136, 108);
      letter-spacing: 9px;
      padding-top:15px;
`

const Header = () => {

  return (
    <div>
   
    <div className="noise-bg"></div>
  
    <div className="hero_wrap">
      <GlobalStyle />
      <div className="portfolio">
        <p>Portfolio</p>
      </div>
      <div className="title-hero">
        <Text>PHILOCLES</Text>
        <CreaWord>CREATIVE</CreaWord>
        <DevTitle>D.e.v.e.l.o.p.e.r</DevTitle>
      </div>

     
    </div>
    
  </div>
 
  )
}

export default Header


//color:rgb(153, 136, 108);