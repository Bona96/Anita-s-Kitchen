import { ArrowRight } from 'lucide-react';
import BackgroundLayer from './BackgroundLayer';

const Footer = () => {
  return (
    <footer className="relative mt-12 border-t border-gray-200 dark:border-gray-800 bg-linear-to-r from-gray-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
      <BackgroundLayer variant="footer" />
      <div className="max-w-6xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-linear-to-br from-cyan-500 to-violet-600 shadow-lg flex items-center justify-center text-white font-bold">A</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Anita's Kitchen</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Traditional flavours, freshly prepared.</p>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-600 dark:text-gray-300 space-y-2">
            <div>
              <strong className="block text-xs text-gray-500">Email</strong>
              <a className="text-cyan-700 dark:text-cyan-300 hover:underline" href="mailto:apioannaanita@gmail.com">apioannaanita@gmail.com</a>
            </div>
            <div>
              <strong className="block text-xs text-gray-500">Phone</strong>
              <a className="text-gray-700 dark:text-gray-200">+256 765 195121</a>
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">From 09:00am - 08:00pm </h4>
          <p className="text-2xl text-gray-600 dark:text-gray-300 space-y-1">
            Delivery On Order!
          </p>

          <div className="mt-6">
            <a href="#contact" className="inline-flex items-center gap-2 bg-linear-to-r from-cyan-500 to-cyan-700 text-white px-4 py-2 rounded-md shadow">
              Order now <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="md:col-span-1">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Subscribe</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">Get specials and updates straight to your inbox.</p>
          <form className="mt-3 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Email address" className="flex-1 px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/60 text-sm" />
            <button className="px-4 py-2 rounded-md bg-maroon-500 hover:bg-maroon-700 text-white text-sm">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="py-6 bg-white/60 dark:bg-gray-900/60 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-300">
          <div>© {new Date().getFullYear()} Anita's Kitchen</div>
          <div className="flex items-center gap-3">
            <span className="text-gray-500">Developed by</span>
            <a
              className='px-3 py-1 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md'
              href="https://knihtdigitalsolutions.vercel.app"
              target="_blank"
              rel="noreferrer"
            >
              KNiHT Digital Solutions
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
