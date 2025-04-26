import React,{useEffect,useRef} from 'react';
import './introProj.css';
import MyIconoProj from '../../assets/iconoProj.svg';
import Crown from '/images/crown-hh.gif';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Styling for the subtitle
const SubTitle = styled.h2`
  font-family: 'SankofaDisplay';
  font-size: 2rem;
  position: relative; 
  z-index: 1;
  color:rgb(255, 255, 255);
  letter-spacing: 28px;
  position: absolute;
  top: -3%;

`;

// Styling for the paragraph text
const TextProj = styled.p`
  font-family: 'space grotesk', sans-serif;
  text-align:center ;
  text-justify: inter-word;
  line-height: 1.6;
  font-size: 2rem;
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
  position: relative; 
  z-index: 2;
  letter-spacing: 4px;

`;

// Styling for the main title (with icon)
const TitleProj = styled.h1`
  font-family: 'velista';
  letter-spacing: 5px;
  font-size: 4.2rem;
  position: relative; 
  z-index: 2;
`;


const Textbkg =styled.p`
   font-family: 'pwgrafitti';
    font-size: 6rem;
    color:rgb(3, 3, 3);

`

const IntroProj = () => {
  const BckgroundSection = useRef(null);
  const bgShapeRef = useRef(null);


  useEffect(() => {
    if (!bgShapeRef.current || !BckgroundSection.current) return;
  
    gsap.fromTo(
      bgShapeRef.current,
      { clipPath: 'circle(10% at 50% 50%)' },
      {
        clipPath: 'circle(150% at 50% 50%)',
        scrollTrigger: {
          trigger: BckgroundSection.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      }
    );
  }, []);


  
  return (
    <div className="introPro" ref={BckgroundSection}>
      <div className= "bckAnim"ref={bgShapeRef}></div>
        <div className="contentSection">
        <div className="contentTitle">
          <SubTitle>Knowledge</SubTitle>
          <TitleProj>
            PROJ<span><img src={MyIconoProj} className="my-iconoProj" /></span>CTS
          </TitleProj>
        <br/>
        <br/>
      </div>

      <TextProj>
       My journey through the digital world began with a focus on technical foundations with frontend then backend. 
       <br/>I studied Product design in the bootcamp THE DESIGN CREW to better understand user experience.
       <br/> Graphic design has been a part of my path from the start, but the projects 
       I present reflect mostly my technical 
       skills.
       <span className="crown">
          <img src={Crown} className="crown" />
        </span> 
        <br/> 
        </TextProj>
          
        
        <Textbkg>Frontend</Textbkg>
          <span className="skills-beg">HTML<br/> CSS<br/> JavaScript<br/>  SASS<br/>  Bootstrap<br/> GSAP<br/> 
          <Textbkg >Backend</Textbkg> Node.js<br/> Java<br/></span>
      </div>
    </div>
  
  );
};

export default IntroProj;
