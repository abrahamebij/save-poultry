"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

// The animated "AI Egg / Core"
function AICore() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Rotate the mesh smoothly on every frame
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* Icosahedron looks like a low-poly egg or data node */}
      <icosahedronGeometry args={[2, 1]} />
      {/* Distort material gives it a slightly organic, breathing feel */}
      <MeshDistortMaterial
        color="#0f766e" /* Matches your primary teal */
        wireframe={true}
        distort={0.3}
        speed={2}
        transparent={true}
        opacity={0.8}
      />
    </mesh>
  );
}

export default function ChickenScene() {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* Lighting to make it look premium */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} color="#14b8a6" intensity={2} />
        
        <AICore />
        
        {/* Allows the user to click and drag the 3D object slightly */}
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}