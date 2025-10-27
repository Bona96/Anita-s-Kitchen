import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900">Get in touch</h2>
          <p className="text-gray-600">Have a question or want to reserve a table? Send us a message.</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/30"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-1 gap-4">
            <input className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-200" placeholder="Your name" />
            <input className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-200" placeholder="Email" />
            <textarea className="border border-gray-200 rounded-lg px-4 py-3 h-32 focus:outline-none focus:ring-2 focus:ring-orange-200" placeholder="Message" />
          </div>

          <div className="mt-6 text-right">
            <button className="inline-flex items-center gap-3 bg-orange-600 text-white px-6 py-3 rounded-full hover:bg-orange-700 transition">
              Send Message
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
