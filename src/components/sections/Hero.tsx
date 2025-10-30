import { motion } from 'framer-motion';
import BackgroundLayer from "../../components/layout/BackgroundLayer";


const Hero = () => {
  // Background interactivity is provided by BackgroundLayer (variant-driven)

  return (
    <section id="home" className="h-screen relative overflow-hidden bg-linear-to-br from-cyan-300 to-gray-300 dark:from-gray-800 dark:to-violet-800">
      <main className="relative z-10 h-full flex items-center justify-center">
      {/* Grid background */}
      <BackgroundLayer variant="hero" className="z-0" />
      <div className="pointer-events-none absolute inset-0 flex flex-col gap-5 items-center justify-center z-10 mb-10 font-poppins">
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl text-neutral-100 font-black uppercase tracking-tight"
        >
          Hi
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-linear-to-r from-violet-600 via-gray-600 to-yellow-800 dark:from-violet-100 dark:via-cyan-100 dark:to-gray-100"
        >
          Anita here👋
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-white w-1/2 text-xl text-center tracking-wide"
        >
          You are welcome to my kitchen! Join my growing community of food lovers.
        </motion.p>
        <motion.a
          href={`#menu`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="text-neutral-100 rounded-full text-3xl p-5 border border-cyan-500 pointer-events-auto bg-linear-to-b from-red-950 to-cyan-800 dark:from-red-950 dark:to-cyan-800"
        >
          Our Menu
        </motion.a>
      </div>
      </main>
    </section>
  );
};


export default Hero;