import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import Logo from "./Logo.tsx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useDarkMode();

  const navVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const menuVariants: Variants = {
    closed: { opacity: 0, x: '100%' },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  // theme and toggleTheme come from DarkModeContext

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="fixed w-full z-50 backdrop-blur-sm bg-linear-to-b from-violet-300/70 to-cyan-400/30 dark:from-red-950/30 dark:to-cyan-500/30 shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo />
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {['Home', 'Menu', 'About', 'Testimonials', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ scale: 1.1 }}
                className="text-gray-800 dark:text-gray-200  transition-colors hover:bg-linear-to-r hover:from-red-950 hover:to-cyan-800 hover:text-white px-3 py-2 rounded-md font-medium"
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Theme toggle (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
              className="p-2 rounded-full bg-white/0 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        variants={menuVariants}
        className={`md:hidden fixed inset-y-0 right-0 w-64 bg-white shadow-lg p-6 ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="flex flex-col space-y-4">
          {['Home', 'Menu', 'About', 'Testimonials', 'Contact'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ scale: 1.05 }}
              className="text-gray-800 hover:text-orange-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </motion.a>
          ))}
          <div className="mt-6">
            <button
              onClick={toggleTheme}
              className="w-full py-2 px-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-center"
            >
              Toggle theme
            </button>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;