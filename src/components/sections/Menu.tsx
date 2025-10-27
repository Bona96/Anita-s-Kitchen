import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import type { Mesh } from 'three';
import { useRef, useState, useEffect } from 'react';
import { menuItems } from '../../assets/constants/constants';


const FoodModel = () => {
  const meshRef = useRef<Mesh>(null);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      if (meshRef.current) meshRef.current.rotation.y += 0.005;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <mesh ref={meshRef} position={[0, -0.3, 0]}>
      <boxGeometry args={[1.6, 0.4, 1]} />
      <meshStandardMaterial color={'#ffcc99'} metalness={0.2} roughness={0.6} />
    </mesh>
  );
};

const variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -300 : 300, opacity: 0 })
};

const Menu = () => {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);

  const paginate = (newDirection: number) => {
    setIndex(([i]) => {
      const next = (i + newDirection + menuItems.length) % menuItems.length;
      return [next, newDirection];
    });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const item = menuItems[index];

  return (
    <section id="menu" className="py-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold mb-2">Our Menu — Taste of Uganda</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Swipe or use arrows to browse — one dish at a time.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              aria-label="Previous"
              onClick={() => paginate(-1)}
              className="p-2 rounded-full bg-white/80 dark:bg-gray-800 shadow hover:scale-105 transition"
            >
              ‹
            </button>
            <button
              aria-label="Next"
              onClick={() => paginate(1)}
              className="p-2 rounded-full bg-white/80 dark:bg-gray-800 shadow hover:scale-105 transition"
            >
              ›
            </button>
          </div>
        </div>

        <div className="relative h-96">
          <AnimatePresence custom={direction} initial={false} mode="wait">
            <motion.article
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute inset-0 flex flex-col md:flex-row items-center gap-8 bg-linear-to-br rounded-2xl p-6 shadow-2xl"
            >
              <div className="w-full md:w-1/2">
                <h3 className="text-3xl font-bold mb-2">{item.name}</h3>
                <p className="text-gray-700 dark:text-gray-200 mb-4">{item.description}</p>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-2xl font-semibold text-orange-600">${item.price.toFixed(2)}</span>
                  <span className="inline-block bg-orange-100 dark:bg-orange-800/30 dark:text-orange-300 text-orange-800 px-3 py-1 rounded-full text-sm">{item.category}</span>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Pair with</h4>
                  <div className="flex flex-wrap gap-3">
                    {item.drinks.map((d) => (
                      <span key={d} className="px-3 py-1 rounded-full bg-white dark:bg-gray-800 text-sm border border-gray-100 dark:border-gray-700">{d}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 h-72 rounded-xl overflow-hidden bg-white/60 dark:bg-gray-800/60 flex items-center justify-center">
                <Canvas>
                  <ambientLight intensity={0.8} />
                  <directionalLight position={[2, 5, 2]} intensity={0.8} />
                  <PerspectiveCamera makeDefault position={[0, 1.2, 3]} />
                  <OrbitControls enableZoom={false} enablePan={false} />
                  <FoodModel />
                </Canvas>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Menu;