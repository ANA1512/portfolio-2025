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
} from '@react-three/drei';

import * as THREE from 'three';
import styled from 'styled-components';

import Navbar from '../navbar/Navbar';
import CarModel from './Car-gnx';

// ==================================================
// 1. LES RÉGLAGES
// ==================================================

// Images présentes dans public/images
const PORTRAIT_IMAGE = '/images/Black-girl-hero.png';
const STREET_IMAGE = '/images/rue-nocturne.png';

// Voiture
const CAR_SIZE = 2.1;
const CAR_START_X = -30;
const CAR_END_X = 13;
const CAR_Y = -2;
const CAR_Z = -10.5;

// Durée du trajet : plus petit = plus rapide
const ARRIVAL_DURATION = 10;

// Orientation de la voiture.
// Si elle avance à reculons, essayer -Math.PI / 2.
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

    /* Petite pause après l’arrêt de la voiture */
    transition-delay: 0.3s;
  }

  .second-title {
    margin-top:14px;
    color:#B8B8B8;
    font-family: Arial, sans-serif;
    font-size: clamp(0.8rem, 1.4vw, 1.2rem);
    font-weight: 400;
    letter-spacing: 0.16em;
    text-transform: uppercase;

    /* Le deuxième titre arrive après le premier */
    transition-delay: 0.65s;
  }

  &.visible .main-title,
  &.visible .second-title {
    opacity: 1;
    transform: translateY(0);
  }
`;

// ==================================================
// 3. LE PORTRAIT
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

// Ajuste le portrait à la hauteur de la scène.
// Ce composant modifie le mesh qui le contient.
function PortraitSize({ texture }) {
  const sizeRef = useRef();

  useFrame(({ viewport }) => {
    if (!sizeRef.current?.parent) return;

    const imageRatio =
      texture.image.width / texture.image.height;

    // On reprend la taille de ton ancien portrait.
    const height = viewport.height * 3;
    const width = height * imageRatio;

    sizeRef.current.parent.scale.set(width, height, 1);
  });

  return <group ref={sizeRef} />;
}

// ==================================================
// 4. LA VOITURE
// ==================================================

function Voiture({ onArrival }) {
  const carRef = useRef();

  // Ces valeurs évoluent sans redessiner la page React.
  const elapsedTime = useRef(0);
  const hasArrived = useRef(false);

  useFrame((_, delta) => {
    if (!carRef.current || hasArrived.current) return;

    // delta = temps passé depuis l’image précédente.
    elapsedTime.current += delta;

    // Progression entre 0 et 1.
    const progress = Math.min(
      elapsedTime.current / ARRIVAL_DURATION,
      1
    );

    // Déplacement qui ralentit progressivement.
    // À la fin, la vitesse devient nulle.
    const movement = 1 - (1 - progress) ** 2;

    // La voiture avance uniquement sur l’axe horizontal.
    carRef.current.position.x =
      CAR_START_X +
      (CAR_END_X - CAR_START_X) * movement;

    // Une fois arrivée, on prévient le composant Hero.
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
      {/* Centre le modèle et pose le bas des roues au sol */}
      <Center bottom>
        <CarModel scale={[CAR_SIZE, CAR_SIZE, CAR_SIZE]} />
      </Center>
    </group>
  );
}

// ==================================================
// 5. LA RUE DANS LE CUBE
// ==================================================

function Rue({ onArrival }) {
  return (
    <>
      {/* Caméra réservée au contenu du cube */}
      <PerspectiveCamera
        makeDefault
        manual
        aspect={CUBE_WIDTH / CUBE_HEIGHT}
        position={[0, 0, 5]}
        fov={40}
      />

      <color attach="background" args={['#020202']} />

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

      {/* City éclaire la voiture sans afficher son décor */}
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

      {/* Ombre transparente sous le passage de la voiture */}
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
// 6. LE CUBE
// Partie technique : une scène affichée dans une texture.
// ==================================================

function Cube({ onArrival }) {
  return (
    <group position={[0, 1, 0]}>
      {/* La rue et la voiture apparaissent sur ce plan */}
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

      {/* Volume en verre conservé autour de la scène */}
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
// 7. LA HERO ET L’APPARITION DES TITRES
// ==================================================

function Hero() {
  // Au départ, les titres sont cachés.
  const [showTitles, setShowTitles] = useState(false);

  // Cette fonction est appelée à l’arrêt de la voiture.
  function handleArrival() {
    setShowTitles(true);
  }

  return (
    <HeroSection>
      <Navigation>
        <Navbar />
      </Navigation>

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

            {/* Éclairage du verre dans la scène principale */}
            <Environment
              preset="city"
              background={false}
            />

            <Cube onArrival={handleArrival} />
          </Suspense>
        </Canvas>
      </CanvasContainer>

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