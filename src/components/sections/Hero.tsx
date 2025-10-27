import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import type { Mesh } from 'three';
import { useRef } from 'react';

const FoodModel = () => {
  const meshRef = useRef<Mesh>(null);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#ff6b6b" metalness={0.5} roughness={0.5} />
    </mesh>
  );
};

const Hero = () => {
  return (
    <section id="home" className="h-screen relative overflow-hidden bg-gradient-to-br from-orange-100 to-white">
      <div className="absolute inset-0">
        <Canvas className="w-full h-full">
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <OrbitControls enableZoom={false} />
          <FoodModel />
        </Canvas>
      </div>
      
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
          >
            Welcome to Anita's Kitchen
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mb-8"
          >
            Experience the finest culinary delights in town
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
          >
            <a
              href="#menu"
              className="inline-block bg-orange-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-orange-700 transition-colors"
            >
              Explore Menu
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;