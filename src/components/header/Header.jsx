import React, { useRef, useEffect, useMemo} from 'react';
import { Canvas, useThree, useLoader,useFrame  } from '@react-three/fiber';
import { Suspense } from 'react';
import { TextureLoader } from 'three';
import styled from 'styled-components';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three'; 
import './header.css';
import Navbar from '../navbar/Navbar'

//3D 
import { MeshTransmissionMaterial, Environment } from '@react-three/drei';
import CarModel from './Car-gnx';

// Style du Canvas pour le rendre plein écran
const StyledCanvas = styled(Canvas)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw; 
  height: 100vh; 
  z-index: 0;
  display: block; 
  pointer-events: none; 
`;

const textStyle = `
  position: absolute;
  font-family: "velista", serif;
  font-size: 5rem;
  font-weight: bold;
  opacity: 1; 
  transform: translateY(0); 
  z-index: 1000;
`;
const CreativeText = styled.p`
  ${textStyle}
  font-family: 'SankofaDisplay';
  top: 55%;
  left: 25%;
  transform: translate(-50%, -50%);
  font-size: 4rem;
  color: rgb(225, 225, 225);
  
`;
const TextWebDeveloper = styled.h1`
  ${textStyle}
  top: 57%; 
  left: 75%;
  transform: translate(-50%, -50%);
  color: rgb(180, 180, 174);
  font-size: 2rem;
`;


const BackgroundPlane = () => {
  const texture = useLoader(TextureLoader, '/images/Black-girl-hero.png'); 
  const { viewport } = useThree();

  // update image size
  const scale = useMemo(() => {
    const ratio = texture.image.width / texture.image.height;
    const height = viewport.height;
    const width = height * ratio; 
    return [width, height, 1]; 
  }, [texture, viewport]);

  useEffect(() => {
    // correct background image
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
  }, [texture]);

  return (
    <mesh position={[0, -2, -10]} scale={scale}>
      <planeGeometry args={[3, 3]}/>
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
};

//CUBE 
const Cube = () => {
  return (
    <mesh position={[0, 1, 0]} scale={[1, 1, 2]}>
      <boxGeometry args={[6, 1.5, 1]} />
      <MeshTransmissionMaterial
        transmission={0.8}
        roughness={0.2}
        clearcoat={0.2}
        color="rgb(35, 37, 40)"
      />
    </mesh>
  );
};

// SCENE
const Scene = () => {

const modelCarRef = useRef();

useFrame(() => {
  if (modelCarRef.current) {
    modelCarRef.current.rotation.y += 0.01;
  }
});
  return (
    <Suspense fallback={null}>
      <BackgroundPlane />
      <Environment preset="city" intensity={3}  background={false}/>
      <ambientLight intensity={0.8} />
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={1}
        color={"rgb(248, 226, 27)"} 
        castShadow  
      />
      <Cube />
      <CarModel ref={modelCarRef} scale={[0.8, 0.8, 0.8]}  position={[-2, 0.45, -5]} />
    </Suspense>
  );
};

// CANVA
const CanvaContainer = () => {
  return (
    <div className="test">
      <Navbar/>
      <StyledCanvas>
        <Scene />
      </StyledCanvas>
      <div className="Title-hero">
        <TextWebDeveloper>Developer</TextWebDeveloper>
        <CreativeText>Creative</CreativeText>
      </div>
    </div>
     
  );
};

export default CanvaContainer;
