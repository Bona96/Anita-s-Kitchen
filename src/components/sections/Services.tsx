import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import type { Mesh } from 'three';
import { useRef } from 'react';
import Anita from '../../assets/media/anita-ceo.jpg';
import TiltCard from "../layout/TiltCard.tsx";

const PlateModel = () => {
  const ref = useRef<Mesh | null>(null);
  // subtle float + slow rotation
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(t * 0.15) * 0.25 + 0.4;
    ref.current.rotation.x = Math.PI / 8 + Math.sin(t * 0.08) * 0.02;
    ref.current.position.y = -0.5 + Math.sin(t * 1.2) * 0.03;
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 8, 0.4, 0]} position={[0, -0.5, 0]}>
      <cylinderGeometry args={[1.8, 1.8, 0.2, 64]} />
      <meshStandardMaterial color="#fffaf0" metalness={0.25} roughness={0.5} />
    </mesh>
  );
};

const Services = () => {
  // motion variants
  const container = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.12, when: 'beforeChildren' }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 12, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1 }
  };

  return (
    <section id="about" className="relative py-24 bg-linear-to-r from-violet-300 to-cyan-100 dark:from-cyan-900 dark:to-violet-800 overflow-hidden">
      {/* <BackgroundLayer variant="hero" className="z-0" /> */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={container}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        >
          {/* left: 3D plate */}
          <motion.div variants={item} className="w-full flex items-center justify-center">
            <div className="w-full max-w-lg h-80 md:h-[420px] rounded-2xl p-4 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-2xl border border-white/30">
                <TiltCard imageSrc={Anita} altText="CEO" />
            </div>
          </motion.div>

          {/* right: content */}
          <motion.div variants={item} className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight mb-3">
              <span className="inline-block bg-clip-text text-transparent bg-linear-to-r from-violet-500 to-cyan-500 dark:from-violet-300 dark:to-cyan-300">My Services</span>
              <span className="ml-2 text-2xl">😊</span>
            </h2>
            <motion.p variants={item} className="text-lg text-gray-800 dark:text-gray-200 mb-4">
              We provide personal and event catering: birthdays, baby showers, family gatherings and weddings —
              thoughtfully prepared with fresh local ingredients.
            </motion.p>

            <motion.ul variants={container} className="flex flex-wrap gap-3 mb-6 justify-center md:justify-start">
              {['Catering', 'Events', 'Custom Menus', 'Takeaway', 'Daily Meals'].map((s) => (
                <motion.li key={s} variants={item} className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm">
                  {s}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={item} className="flex items-center gap-4 justify-center md:justify-start">
              <motion.button 
                whileHover={{ scale: 1.03 }} 
                whileTap={{ scale: 0.98 }} 
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-violet-600 text-white font-semibold shadow-lg focus:outline-none focus:ring-4 focus:ring-rose-200"
                onClick={() => { window.location.href = '#contact'; }}
              >
                Book a Catering
              </motion.button>
              <motion.a whileHover={{ x: 4 }} className="text-sm text-gray-700 dark:text-gray-200 hover:underline" href="#contact">
                Contact us
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
