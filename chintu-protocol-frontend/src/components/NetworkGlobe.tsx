import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Network Node Component
function NetworkNode({ position, color = '#00ffff', size = 0.02 }: { 
  position: [number, number, number]; 
  color?: string; 
  size?: number; 
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
      <pointLight color={color} intensity={0.5} distance={0.2} />
    </mesh>
  );
}

// Main Globe Scene
function GlobeScene() {
  const globeRef = useRef<THREE.Mesh>(null);
  
  // Generate network nodes on globe surface
  const nodes = useMemo(() => {
    const nodePositions: [number, number, number][] = [];
    const nodeCount = 20;
    
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      
      const x = Math.cos(theta) * Math.sin(phi);
      const y = Math.sin(theta) * Math.sin(phi);
      const z = Math.cos(phi);
      
      nodePositions.push([x, y, z]);
    }
    
    return nodePositions;
  }, []);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      {/* Main Globe */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[0.98, 64, 64]} />
        <meshBasicMaterial 
          color="#001122" 
          transparent 
          opacity={0.1} 
          wireframe 
        />
      </mesh>
      
      {/* Network Nodes */}
      {nodes.map((position, index) => (
        <NetworkNode 
          key={index} 
          position={position} 
          color={index % 3 === 0 ? '#00ffff' : index % 3 === 1 ? '#00ff88' : '#0088ff'}
          size={0.015 + Math.random() * 0.01}
        />
      ))}
      
      {/* Central Chintu Hub */}
      <mesh>
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.9} />
        <pointLight color="#00ffff" intensity={2} distance={1} />
      </mesh>
    </group>
  );
}

export default function NetworkGlobe() {
  return (
    <div className="w-full h-[600px] relative">
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        
        <GlobeScene />
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI * 0.3}
          maxPolarAngle={Math.PI * 0.7}
        />
      </Canvas>
      
      {/* Overlay gradient for better integration */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
    </div>
  );
}