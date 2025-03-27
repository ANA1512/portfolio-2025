import React from 'react'
import GlobalStyle from '../../style/Globalstyle'
import styled from 'styled-components';
//import gsap from 'gsap'
import './header.css'

//NAME
const Text = styled.span`
      font-size: 2.5rem;
      font-family: 'SankofaDisplay', serif;
      color:#333230;
      letter-spacing: 2px; 
`
//CREATIVE
const CreaWord = styled.h2`
       font-family: 'Velista', serif;
       font-size: 5rem; 
       color:#1F1E1E;
       letter-spacing: 4px; 
     
`
//OCCUPATION
const DevTitle =styled.p`
      font-family: 'Velista', serif;
      font-size: 4rem;
      color:rgb(180, 180, 174);
      letter-spacing: 4px;
      
`

const Header = () => {

  return (
    <div className="headerWrap">
   
    <div className="noise-bg"></div>
  
    <div className="hero_wrap">
      <GlobalStyle />
      <div className="portfolio">
        <h4>Portfolio</h4>
      </div>
      <div className="title-hero">
        {/* <Text>PHILOCLES</Text> */}
        <CreaWord>CREATIVE</CreaWord>
        <DevTitle>Developer</DevTitle>
      </div>

     
    </div>
    
  </div>
 
  )
}

export default Header


//color:rgb(153, 136, 108);