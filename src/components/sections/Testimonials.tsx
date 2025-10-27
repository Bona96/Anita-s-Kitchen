import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Maria P.',
    text: "The food here is like a warm hug — unforgettable!",
  },
  {
    id: 2,
    name: 'James K.',
    text: "Beautiful presentation and the flavours are just perfect.",
  },
  {
    id: 3,
    name: 'Sana R.',
    text: "Cozy place, friendly staff — my new favorite spot.",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-gray-900 mb-8"
        >
          What People Say
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <motion.blockquote
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, translateY: -6 }}
              transition={{ duration: 0.6, delay: t.id * 0.12, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="p-6 bg-gradient-to-br from-orange-50 to-white rounded-2xl shadow-2xl border border-orange-50 transform-gpu will-change-transform"
            >
              <p className="text-gray-700 mb-4">“{t.text}”</p>
              <footer className="text-sm text-gray-500">— {t.name}</footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
