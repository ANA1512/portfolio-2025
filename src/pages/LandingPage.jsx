import React from 'react'
import Hero from '../components/header/Header'
import IntroProjects  from '../components/projets/IntroProj'
import Projects from '../components/projets/Accordion'
import About from '../components/about/About'
import GlobalStyle from '../style/Globalstyle';


const LandingPage = () => {
  return (
    <> 
      <GlobalStyle/>
      <Hero/> 
      <About/>
      <IntroProjects/> 
      <Projects/>
      
  
    </>
  )
}

export default LandingPage
