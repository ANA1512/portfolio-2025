import { MeshDistortMaterial, Sphere } from "@react-three/drei";

const Shape = ({ color = "#f6d519" }) => {
  return (
    <>
      <Sphere args={[1, 32, 32]} scale={[1.5, 2, 1]}>
        <MeshDistortMaterial
          color={color} 
          attach="material"
          distort={0.5}
          speed={2}
        />
      </Sphere>
      <ambientLight intensity={2} />
      <directionalLight position={[1, 2, 3]} />
    </>
  );
};

export default Shape;
