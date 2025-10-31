import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Menu from './components/sections/Menu';
import About from './components/sections/About';
import Testimonials from './components/sections/Testimonials';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import Services from './components/sections/Services';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />
      <main className="pt-16 h-full">
        <Hero />
        <Services />
        <Menu />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
