import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Menu from './components/sections/Menu';
import About from './components/sections/About';
import Testimonials from './components/sections/Testimonials';
import Contact from './components/sections/Contact';

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main>
        <Hero />
        <Menu />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <footer className="py-8 text-center text-sm ">
        <div className="py-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Anita's Kitchen — Made with ❤️
        </div>
          Developed by:
        <a 
          className='p-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md ml-2'
          href="https://knihtdigitalsolutions.vercel.app"
        >
          KNiHT Digital Solutions
        </a>
      </footer>
    </div>
  );
}

export default App;
