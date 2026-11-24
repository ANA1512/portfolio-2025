
import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Canvas,
  useFrame,
  useLoader,
} from '@react-three/fiber';

import {
  Center,
  ContactShadows,
  Environment,
  Image,
  MeshTransmissionMaterial,
  PerspectiveCamera,
  RenderTexture,
  useProgress,
} from '@react-three/drei';

import * as THREE from 'three';
import styled from 'styled-components';

import Navbar from '../navbar/Navbar';
import CarModel from './Car-gnx';


// ==================================================
// 1. LES RÉGLAGES
// ==================================================

const PORTRAIT_IMAGE = '/images/Black-girl-hero.png';
const STREET_IMAGE = '/images/rue-nocturne.png';

// Voiture
const CAR_SIZE = 2.1;
const CAR_START_X = -30;
const CAR_END_X = 13;
const CAR_Y = -2;
const CAR_Z = -10.5;

// Durée du trajet
const ARRIVAL_DURATION = 10;

// Orientation de la voiture
const CAR_ROTATION_Y = Math.PI / 2;

// Cube
const CUBE_WIDTH = 6;
const CUBE_HEIGHT = 1.5;
const CUBE_DEPTH = 2.3;


// ==================================================
// 2. LE STYLE DE LA PAGE
// ==================================================

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 560px;
  overflow: hidden;
  background: white;
  isolation: isolate;
`;

const Navigation = styled.div`
  position: relative;
  z-index: 2;
`;

const CanvasContainer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
`;

const Titles = styled.div`
  position: absolute;
  top: 28%;
  left: 5%;
  right: 5%;
  z-index: 1;

  text-align: center;
  pointer-events: none;

  .main-title,
  .second-title {
    margin: 0;
    opacity: 0;
    transform: translateY(15px);

    transition:
      opacity 0.8s ease,
      transform 0.8s ease;
  }

  .main-title {
    color: white;
    font-family: 'SankofaDisplay';
    font-size: clamp(1.3rem, 3.5vw, 3.5rem);
    font-weight: 400;
    line-height: 1.15;
    letter-spacing: 10px;

    transition-delay: 0.3s;
  }

  .second-title {
    margin-top: 14px;
    color: #B8B8B8;
    font-family: 'space grotesk', sans-serif;
    font-size: clamp(0.8rem, 1.4vw, 1.2rem);
    font-weight: 400;
    letter-spacing: 0.16em;
    text-transform: uppercase;

    transition-delay: 0.65s;
  }

  &.visible .main-title,
  &.visible .second-title {
    opacity: 1;
    transform: translateY(0);
  }
`;


// ==================================================
// 3. STYLE DU LOADER
// ==================================================

const LoaderContainer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 100;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;

  background: #e5e5e5;

  opacity: ${({ $ready }) => ($ready ? 0 : 1)};
  visibility: ${({ $ready }) => (
    $ready ? 'hidden' : 'visible'
  )};

  pointer-events: ${({ $ready }) => (
    $ready ? 'none' : 'auto'
  )};

  transition:
    opacity 0.6s ease,
    visibility 0.6s ease;
`;

const LoaderPercent = styled.span`
  font-family: 'space grotesk', sans-serif;
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 300;
  font-variant-numeric: tabular-nums;
  color: #373737;
`;

const LoaderLabel = styled.span`
  font-family: 'space grotesk', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 4px;
  color: #777777;
`;

const LoaderTrack = styled.div`
  width: 100px;
  height: 2px;
  background: #c8c8c8;
  margin-top: 10px;
`;

const LoaderProgress = styled.div`
  width: ${({ $progress }) => `${$progress}%`};
  height: 100%;
  background: #373737;
  transition: width 0.2s ease;
`;


// ==================================================
// 4. LE LOADER
// ==================================================

function HeroLoader({ ready }) {

  const { progress } = useProgress();

  const percentage = ready
    ? 100
    : Math.min(99, Math.round(progress));

  return (
    <LoaderContainer
      $ready={ready}
      role="progressbar"
      aria-label="Loading"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percentage}
    >

      <LoaderPercent>
        {percentage}%
      </LoaderPercent>

      <LoaderLabel>
        LOADING...
      </LoaderLabel>

      <LoaderTrack>
        <LoaderProgress $progress={percentage} />
      </LoaderTrack>

    </LoaderContainer>
  );
}


// Détecte lorsque les composants de la scène
// ont terminé leur chargement via Suspense.

function SceneReady({ onReady }) {

  useEffect(() => {
    onReady(true);
  }, [onReady]);

  return null;
}


// ==================================================
// 5. LE PORTRAIT
// ==================================================

function Portrait() {

  const texture = useLoader(
    THREE.TextureLoader,
    PORTRAIT_IMAGE
  );

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

  return (
    <mesh position={[0, -2, -10]}>

      <planeGeometry args={[1, 1]} />

      <meshBasicMaterial
        map={texture}
        transparent
        toneMapped={false}
      />

      <PortraitSize texture={texture} />

    </mesh>
  );
}


function PortraitSize({ texture }) {

  const sizeRef = useRef();

  useFrame(({ viewport }) => {

    if (!sizeRef.current?.parent) return;

    const imageRatio =
      texture.image.width / texture.image.height;

    const height = viewport.height * 3;
    const width = height * imageRatio;

    sizeRef.current.parent.scale.set(
      width,
      height,
      1
    );

  });

  return <group ref={sizeRef} />;
}


// ==================================================
// 6. LA VOITURE
// ==================================================

function Voiture({ onArrival }) {

  const carRef = useRef();

  const elapsedTime = useRef(0);
  const hasArrived = useRef(false);

  useFrame((_, delta) => {

    if (!carRef.current || hasArrived.current) return;

    elapsedTime.current += delta;

    const progress = Math.min(
      elapsedTime.current / ARRIVAL_DURATION,
      1
    );

    const movement = 1 - (1 - progress) ** 2;

    carRef.current.position.x =
      CAR_START_X +
      (CAR_END_X - CAR_START_X) * movement;

    if (progress === 1) {

      hasArrived.current = true;

      onArrival();

    }

  });

  return (

    <group
      ref={carRef}
      position={[CAR_START_X, CAR_Y, CAR_Z]}
      rotation={[0, CAR_ROTATION_Y, 0]}
    >

      <Center bottom>

        <CarModel
          scale={[CAR_SIZE, CAR_SIZE, CAR_SIZE]}
        />

      </Center>

    </group>

  );
}


// ==================================================
// 7. LA RUE DANS LE CUBE
// ==================================================

function Rue({ onArrival }) {

  return (
    <>

      <PerspectiveCamera
        makeDefault
        manual
        aspect={CUBE_WIDTH / CUBE_HEIGHT}
        position={[0, 0, 5]}
        fov={40}
      />

      <color
        attach="background"
        args={['#020202']}
      />


      {/* Image fixe de la rue */}

      <Image
        url={STREET_IMAGE}
        position={[0, 0, -15]}
        scale={[60, 15]}
        color="#777470"
        grayscale={0.25}
        toneMapped={false}
      />


      {/* Léger voile devant les bâtiments */}

      <mesh position={[0, 0, -14.95]}>

        <planeGeometry args={[60, 15]} />

        <meshBasicMaterial
          color="#45474a"
          transparent
          opacity={0.09}
          depthWrite={false}
          toneMapped={false}
        />

      </mesh>


      {/* Éclairage de la voiture */}

      <Environment
        preset="city"
        background={false}
      />

      <ambientLight intensity={0.08} />

      <directionalLight
        position={[5, 8, 2]}
        intensity={0.3}
        color="#ffe5c0"
      />


      <Voiture onArrival={onArrival} />


      {/* Ombre de la voiture */}

      <ContactShadows
        position={[-12, CAR_Y - 0.01, CAR_Z]}
        scale={[42, 12]}
        opacity={0.7}
        blur={2}
        far={4}
        resolution={512}
        color="#000000"
      />

    </>
  );
}


// ==================================================
// 8. LE CUBE
// ==================================================

function Cube({ onArrival }) {

  return (

    <group position={[0, 1, 0]}>

      {/* La rue et la voiture */}

      <mesh position={[0, 0, CUBE_DEPTH / 2 - 0.001]}>

        <planeGeometry
          args={[CUBE_WIDTH, CUBE_HEIGHT]}
        />

        <meshBasicMaterial toneMapped={false}>

          <RenderTexture
            attach="map"
            width={2048}
            height={512}
          >

            <Rue onArrival={onArrival} />

          </RenderTexture>

        </meshBasicMaterial>

      </mesh>


      {/* Volume en verre */}

      <mesh>

        <boxGeometry
          args={[
            CUBE_WIDTH,
            CUBE_HEIGHT,
            CUBE_DEPTH,
          ]}
        />

        <MeshTransmissionMaterial
          transmission={1}
          thickness={0.03}
          roughness={0.015}
          ior={1.02}
          chromaticAberration={0.003}
          anisotropicBlur={0}
          distortion={0}
          temporalDistortion={0}
          color="#ffffff"
          clearcoat={0.2}
          clearcoatRoughness={0.05}
          resolution={1024}
          samples={6}
        />

      </mesh>

    </group>

  );
}


// ==================================================
// 9. LA HERO
// ==================================================

function Hero() {

  const [showTitles, setShowTitles] = useState(false);

  const [sceneReady, setSceneReady] = useState(false);


  function handleArrival() {

    setShowTitles(true);

  }


  return (

    <HeroSection>

      {/* LOADER */}

      <HeroLoader ready={sceneReady} />


      {/* NAVIGATION */}

      <Navigation>

        <Navbar />

      </Navigation>


      {/* SCÈNE THREE.JS */}

      <CanvasContainer>

        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
          }}
          gl={{
            alpha: true,
            antialias: true,
          }}
          dpr={[1, 2]}
        >

          <Suspense fallback={null}>

            <Portrait />

            <Environment
              preset="city"
              background={false}
            />

            <Cube onArrival={handleArrival} />

            <SceneReady onReady={setSceneReady} />

          </Suspense>

        </Canvas>

      </CanvasContainer>


      {/* APPARITION DES TITRES */}

      <Titles className={showTitles ? 'visible' : ''}>

        <h1 className="main-title">
          Creative Technologist
        </h1>

        <p className="second-title">
          Software Engineer
        </p>

      </Titles>

    </HeroSection>

  );
}

export default Hero;
