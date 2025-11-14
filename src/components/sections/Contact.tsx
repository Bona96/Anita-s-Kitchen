import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import BackgroundLayer from '../../components/layout/BackgroundLayer';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<{ type: 'idle' | 'sending' | 'success' | 'error'; message?: string }>({ type: 'idle' });

  // EmailJS configuration via Vite env variables. Set these in .env as:
  // VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY
  const SERVICE_ID = (import.meta as any).env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = (import.meta as any).env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus({ type: 'sending' });

    const formData = new FormData(formRef.current);
    const templateParams = Object.fromEntries(formData.entries());

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.warn('EmailJS not configured. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY');
      console.log('Form data:', templateParams);
      setStatus({ type: 'success', message: 'Form captured locally (EmailJS not configured).' });
      return;
    }

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams as any, PUBLIC_KEY);
      setStatus({ type: 'success', message: "Message sent — we'll be in touch!" });
      formRef.current.reset();
    } catch (err: any) {
      console.error('EmailJS error', err);
      setStatus({ type: 'error', message: 'Failed to send message — please try again or email us directly.' });
    }
  };

  return (
    <section id="contact" className="relative py-20 bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <BackgroundLayer variant="contact" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-maroon-700 dark:text-maroon-200">Get in touch</h2>
          <p className="text-gray-600 dark:text-gray-300">Place your order now, Send us a message and we'll get back to you shortly.</p>
        </motion.div>

        {/* Map
        <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
          <iframe
            title="Anita's Kitchen location"
            className="w-full h-64 block"
            src="https://www.openstreetmap.org/export/embed.html?bbox=32.57252%2C0.337596%2C32.59252%2C0.357596&layer=mapnik&marker=0.347596%2C32.5825203"
            style={{ border: 0 }}
            loading="lazy"
          />
        </div> */}

        <motion.form
          ref={formRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="bg-white/80 dark:bg-gray-800/60 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/30 dark:border-gray-700"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-violet-900 dark:text-cyan-200">
            <label className="sr-only">Name</label>
            <input name="from_name" required className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-300" placeholder="Your name" />
            <label className="sr-only">Email</label>
            <input name="from_email" type="email" required className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-300" placeholder="Email" />
            <label className="sr-only">Phone</label>
            <input name="phone" className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-300" placeholder="Phone (optional)" />
            <label className="sr-only">Subject</label>
            <input name="subject" className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-300" placeholder="Subject" />
            <label className="sr-only">Message</label>
            <textarea name="message" required className="md:col-span-2 border border-gray-200 rounded-lg px-4 py-3 h-36 focus:outline-none focus:ring-2 focus:ring-cyan-300" placeholder="Message" />
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-300">{status.type === 'success' ? <span className="text-green-600">{status.message}</span> : status.type === 'error' ? <span className="text-red-500">{status.message}</span> : null}</div>
            <button
              type="submit"
              disabled={status.type === 'sending'}
              className="inline-flex items-center gap-3 bg-linear-to-r from-cyan-500 to-cyan-700 text-white px-6 py-3 rounded-full hover:opacity-95 transition disabled:opacity-60"
            >
              {status.type === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
