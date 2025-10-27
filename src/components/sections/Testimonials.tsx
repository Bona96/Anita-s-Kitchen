import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Testimonial = { id: number; name: string; text: string };

const testimonials: Testimonial[] = [
  { id: 1, name: 'Sempebwa Donald', text: 'The food and service are simply outstanding!' },
  { id: 2, name: 'Angelo Mazima', text: 'Beautiful presentation and the flavours are just perfect.' },
  { id: 3, name: 'Kasule Roy', text: 'I truly felt at home with every bite.' },
  { id: 4, name: 'Jusang', text: 'Cozy place, friendly staff — my new favorite spot.' },
  { id: 5, name: 'Michael O.', text: 'Every visit feels like family. The matooke is delicious.' },
];

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

const Testimonials: React.FC = () => {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const autoRef = useRef<number | null>(null);

  const paginate = (dir: number) => {
    setIndex(([i]) => {
      const next = (i + dir + testimonials.length) % testimonials.length;
      return [next, dir];
    });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (autoRef.current) window.clearInterval(autoRef.current);
    if (!paused) {
      autoRef.current = window.setInterval(() => paginate(1), 4500);
    }
    return () => {
      if (autoRef.current) window.clearInterval(autoRef.current);
      autoRef.current = null;
    };
  }, [paused]);

  const current = testimonials[index];

  const AUTO_ADVANCE = 4500; // ms

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8"
        >
          What People Say
        </motion.h2>

        <div
          className="relative h-56 touch-pan-y"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          tabIndex={0}
          aria-roledescription="carousel"
          aria-label="Testimonials carousel"
        >
          <AnimatePresence custom={direction} initial={false} mode="wait">
            <motion.blockquote
              key={current.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) paginate(1);
                if (info.offset.x > 50) paginate(-1);
              }}
              whileDrag={{ cursor: 'grabbing' }}
              className="absolute inset-0 p-6 bg-linear-to-br from-orange-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl border border-orange-50 dark:border-gray-800 flex flex-col items-center justify-center"
            >
              <p className="text-gray-700 dark:text-gray-200 text-lg mb-4">“{current.text}”</p>
              <footer className="text-sm text-gray-500 dark:text-gray-400">— {current.name}</footer>
            </motion.blockquote>
          </AnimatePresence>

          {/* progress bar */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-2/3 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              key={index}
              style={{
                width: '0%',
                height: '100%',
                background: 'linear-gradient(90deg,#fb923c,#f97316)',
                animation: paused ? 'none' : `tk-fill ${AUTO_ADVANCE}ms linear forwards`
              }}
            />
          </div>

          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <button
              aria-label="Previous testimonial"
              onClick={() => paginate(-1)}
              className="p-2 rounded-full bg-white/90 dark:bg-gray-800 shadow hover:scale-105 transition"
            >
              ‹
            </button>
          </div>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <button
              aria-label="Next testimonial"
              onClick={() => paginate(1)}
              className="p-2 rounded-full bg-white/90 dark:bg-gray-800 shadow hover:scale-105 transition"
            >
              ›
            </button>
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setIndex([i, i > index ? 1 : -1])}
                className={`w-3 h-3 rounded-full ${i === index ? 'bg-orange-600' : 'bg-gray-300 dark:bg-gray-600'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
