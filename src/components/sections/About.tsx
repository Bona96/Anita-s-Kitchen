import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import type { Mesh } from 'three';
import { useRef } from 'react';

const PlateModel = () => {
  const ref = useRef<Mesh>(null);
  return (
    <mesh ref={ref} rotation={[Math.PI / 8, 0.4, 0]} position={[0, -0.5, 0]}>
      <cylinderGeometry args={[1.8, 1.8, 0.2, 64]} />
      <meshStandardMaterial color="#fffaf0" metalness={0.2} roughness={0.6} />
    </mesh>
  );
};

const About = () => {
  return (
  <section id="about" className="py-24 bg-linear-to-b from-white to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">About Anita</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              Anita's Kitchen is where heart and flavour meet. Family recipes, fresh
              ingredients, and a love for sharing meals made with care.
            </p>
            <p className="text-gray-600 dark:text-gray-400">Open daily for breakfast, lunch and dinner — come feel at home.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="w-full h-72 rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800"
            viewport={{ once: true }}
          >
            {/* 3D placeholder using react-three for a decorative plate. If you prefer Sketchfab, replace this block with their embed iframe. */}
            <Canvas className="w-full h-full">
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <PerspectiveCamera makeDefault position={[0, 1.5, 3]} />
              <OrbitControls enableZoom={false} enablePan={false} />
              <PlateModel />
            </Canvas>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
