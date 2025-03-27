import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import{ MeshTransmissionMaterial} from "@react-three/drei";
import { Suspense } from 'react';
import CarModel from './Car-gnx'; 


//Cube
const Cube = () =>{
  return(
    <mesh>
       <boxGeometry args={[8,3,2]}/>
       <MeshTransmissionMaterial
        thickness={0.1}
        transmission={0.8}
        roughness={0.2}
        clearcoat={0.2}
        envMapIntensity={0.2}
        samples={4}
        color="rgb(50, 49, 49)"
      />
    </mesh>
 
  )
 }

//Car
const Scene = () => {
  const modelCarRef = useRef();

  useFrame(() => {
    if (modelCarRef.current) {
      modelCarRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Suspense fallback="loading...">
      <Cube/>
      <CarModel ref={modelCarRef} scale={[1, 1, 1]} position={[0, 0, 0]} />
    </Suspense>
  );
};



const CarContainer = () => {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
};

export default CarContainer;
