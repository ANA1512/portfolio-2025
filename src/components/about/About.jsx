import React from 'react'
import styled from 'styled-components';
import Shape from '../projets/Shape'
import { Canvas } from '@react-three/fiber'
import './about.css'



const TitleProj = styled.h1`
  font-family: 'velista';
  letter-spacing: 5px;
  font-size: 4.2rem;
  position: relative; 
  z-index: 2;
`;

const SubTitle = styled.h2`
  font-family: 'SankofaDisplay';
  font-size: 2rem;
  position: relative; 
  z-index: 1;
  color:#0e0e0e;
  letter-spacing:12px;
  position: absolute;
  top: -1%;

`;

const TextProj = styled.p`
  font-family: 'space grotesk', sans-serif;
  text-align:center ;
  text-justify: inter-word;
  line-height: 1.6;
  font-size: 1.5rem;
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
  position: relative; 
  z-index: 2;
  letter-spacing: 4px;

`;
const About = () => {
  return (
    <section className="section-about" style={{ position: 'relative' }}>
      <br/>
      <div className="contentSection">

        <SubTitle>Life's journey</SubTitle>
        <br/>
        <br/>
        <TitleProj>About
        <span className="sym-life">
           <img src="images/life.png" alt="life-symbol" className="life" />
        </span>
        </TitleProj>
        <br/>
        <br/>
        < TextProj>
        From law to audiovisual production, and from audiovisual production to software development, my journey may seem unconventional. Yet one common thread connects each of these experiences: <br/>creativity and creation. <br/>
        Law taught me to structure my thinking, analyse and navigate complexity.<br/>
        Audiovisual production allowed me to explore storytelling, visual expression and the process of turning an idea into a tangible project.<br/>
        Software development opened up a new realm of possibilities: the ability to imagine, design and build my own experiences.<br/>
        Today, at the intersection of art, design and software engineering, I explore technology as a medium for creative expression.
        Passionate about culture, music and emerging technologies, I draw inspiration from these diverse worlds to fuel my imagination and push the boundaries of my creativity.
        While the tools have evolved throughout my journey, the intention has always remained the same: to create.
        </ TextProj>

      </div>

      <section className="bio">
        <img src="/images/Portrait_Portfolio.png" alt="me" />
      </section> 
     
      <div
        className="shape-wrapper"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      >
        <Canvas>
          <ambientLight />
          <pointLight position={[11, 11, 11]} />
          <Shape color="#A2A2A2"  />
        </Canvas>
      </div>

     
      <div>
      
 
      </div>

 
    </section>
  )
}

export default About
