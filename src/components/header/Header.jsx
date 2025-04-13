import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import CarModel from './Car-gnx';
import styled from 'styled-components';
import Navbar from '../navbar/Navbar';
import './header.css';
import Butterfly from '/images/butterfly.png'

// Style du canvas
const StyledCanvas = styled(Canvas)`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Textes de base
const textStyle = `
  position: absolute;
  font-family: "velista", serif;
  font-size: 5rem;
  font-weight: bold;
  opacity: 1; 
  transform: translateY(0); 
  z-index: 1000;
`;

const PortfolioText = styled.h2`
  ${textStyle}
  top: 4%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgb(172, 170, 170);
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 10px;
`;

const TextWebDeveloper = styled.h1`
  ${textStyle}
  top: 50%; 
  left: 70%;
  transform: translate(-50%, -50%);
  color: rgb(180, 180, 174);
  font-size: 8rem;
`;


const CreativeText = styled.p`
  ${textStyle}
  top: 40%;
  left: 28%;
  transform: translate(-50%, -50%);
  color: rgb(6, 6, 6);
  font-size: 10rem;
`;

// Cube (dans la scène 3D)
const Cube = () => {
  return (
    <mesh position={[0, 0.4, 1]} scale={[1, 1, 1]}>
      <boxGeometry args={[9, 3.01, 2]} />
      <MeshTransmissionMaterial
        thickness={0.1}
        transmission={0.8}
        roughness={0.2}
        clearcoat={0.2}
        envMapIntensity={0.2}
        samples={4}
        color="rgb(117, 117, 117)"
      />
    </mesh>
  );
};

// Scène contenant la voiture et le cube
 const Scene = () => {
  const modelCarRef = useRef();
 

  useFrame(() => {
    if (modelCarRef.current) {
      modelCarRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Suspense fallback="loading...">
       <Environment preset="city" intensity={0.4} />
      <Cube />
      <CarModel ref={modelCarRef} scale={[1, 1, 1]}  position={[-4, -2, -5]} />
    </Suspense>


  );
};

// Container pour la scène 3D
const CanvaContainer = () => {

  return (
    <div className="canva-section">
      <Navbar/>
     
      <StyledCanvas>
        <Scene />
        <ambientLight intensity={0.2} color={"rgb(108, 108, 108)"} />
        <directionalLight 
              position={[5, 10, 5]} 
              intensity={5} 
              color={"rgb(126, 129, 129)"} 
              castShadow 
             />
      </StyledCanvas>
    
      <div className="title-hero">
        <div className="butterfly">
          <img src={Butterfly}  alt="papillon" />;
        </div>
          <TextWebDeveloper>Developer</TextWebDeveloper>
          <CreativeText>Creative</CreativeText>
          {/* <PortfolioText>PORTFOLIO</PortfolioText> */}
      </div>
    </div>


  );
};

export default CanvaContainer;
